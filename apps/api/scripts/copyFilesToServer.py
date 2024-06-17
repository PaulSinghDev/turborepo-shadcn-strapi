import argparse
import paramiko
import tarfile
import os

## Setup an arg parser
arg_parser = argparse.ArgumentParser()

## Tell arg parser what we want args for
arg_parser.add_argument("--domain", help="The domain on which this will be deployed", required=True, type=str)
arg_parser.add_argument("--ip", "-i", help="The destination server IP", required=True, type=str)
arg_parser.add_argument("--port", "-p", help="The destination server port", required=True, type=int)
arg_parser.add_argument("--hash", "-H", help="The commit hash for this deployment", required=True, type=str)
arg_parser.add_argument("--username", "-u", help="The username to use with connections to the remote server", required=True, type=str)
arg_parser.add_argument("--sites-enabled", help="The path to the sites-enabled folder on the remote server", default="/etc/nginx/sites-enabled", required=False, type=str)
arg_parser.add_argument("--sites-available", help="The path to the sites-available folder on the remote server", default="/etc/nginx/sites-available", required=False, type=str)

## Get our args
args = arg_parser.parse_args()

def create_tarball(path:str,add_path:str):
    print(f"Making archive in {path}")
    ## Open a tar file
    tar = tarfile.open(path, "w:gz")
    ## Add the root folder to the tar
    tar.add(os.path.abspath(add_path), arcname=".")
    ## Close the tar file
    tar.close()
    print(f"Finished making archive")

def upload_tarball(client:paramiko.SSHClient):
    print(f"Uploading tarball to /tmp/{args.hash}.tar.gz")
    sftp = client.open_sftp()
    sftp.put(tar_path, f"/tmp/{args.hash}.tar.gz")
    sftp.close()
    print(f"Finished uploading tarball")

def cleanup():
    ## Remove the tar
    os.remove(tar_path)

def get_connected_client():
    ## Get a client object
    client = paramiko.SSHClient()
    ## Set known hosts
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ## Try and load ssh keys from the system
    client.load_system_host_keys()
    ## Connect to the remote server
    client.connect(hostname=args.ip,port=args.port,username=args.username)  
    ## Make the agent request handler handle requests from the server using the
    ## system SSH keys
    paramiko.agent.AgentRequestHandler(client.get_transport().open_session())
    ## Check we have keys
    if not paramiko.Agent().get_keys():
        print("No SSH keys found in the system. Did you spawn an ssh agent before running the script?")
        exit(1)
    else:
        print("Connected to remote host")
        return client

deployment_path = f"/var/www/{args.domain}/deployments/{args.hash}"
deployment_domain_fragments = args.domain.split('.')[1:]
deployment_domain = f"{args.hash}"
for section in deployment_domain_fragments:
    deployment_domain = f"{deployment_domain}.{section}"

print(f"Starting deployment {args.hash} with domain: {deployment_domain}")

## Get some dirs
script_dir = os.path.dirname(os.path.abspath(__file__))
root = os.path.join(script_dir, "..")
tar_path = os.path.join(root, f"{args.hash}.tar.gz")

## Make our tarball
create_tarball(tar_path,root)

print(f"Connecting to {args.ip}")

## Get a client we can use
client = get_connected_client()

## Upload our tarball
upload_tarball(client)

## key = paramiko.Ed25519Key.from_private_key_file(os.path.join(os.path.abspath(root), "key.txt"))
## Connect to the server
## Open an FTP connection


## Copy our tarball

print(f"Creating deployment in /var/www/{args.domain}/deployments/{args.hash}")


try:
    ## Array of commands to make on remote server
    commands = [
        f"mkdir {deployment_path}",
        f"mv /tmp/{args.hash}.tar.gz {deployment_path}/{args.hash}.tar.gz",
        f"tar -xzf {deployment_path}/{args.hash}.tar.gz -C {deployment_path}",
        f"rm {deployment_path}/{args.hash}.tar.gz",
        f"cd {deployment_path}; python3 scripts/copyVirtualHost.py --domain {deployment_domain}",
        f"cd {deployment_path}; python3 scripts/updateUpstream.py --hash {args.hash} --domain {deployment_domain}",
        ##f"cd {deployment_path}; yarn install --frozen-lockfile",
        ##f"cd {deployment_path}; yarn build",
        ##f"cd {deployment_path}; pm2 yarn start --name {args.hash} -- start"
    ]


    ## Iterate them
    for command in commands:
        ## Get thr response
        stdin, stdout, stderr = client.exec_command(command)
        ## Check if there was an error
        if stdout.channel.recv_exit_status() != 0:
            print(f"Error running command '{command}': {stderr.read().decode()}")
            cleanup()
            client.close()
            exit(1)
        else:
            print(f"Output of '{command}':\n{stdout.read().decode()}")
except:
    cleanup()




print(f"Deployment {args.hash} created")

##sftp.close()
##ssh.close()

cleanup()
exit(0)

##subprocess.run(["scp", os.path.join(script_dir, "./copyVirtualHost.py"), "aumni@161.97.184.130:/tmp"])