import argparse
import re
import os

## Setup an arg parser
arg_parser = argparse.ArgumentParser()

## Tell arg parser what we want args for
arg_parser.add_argument("--domain", help="The domain on which this will be deployed", required=True, type=str)
arg_parser.add_argument("--sites-enabled", help="The path to the sites-enabled folder on the remote server", default="/etc/nginx/sites-enabled", required=False, type=str)
arg_parser.add_argument("--sites-available", help="The path to the sites-available folder on the remote server", default="/etc/nginx/sites-available", required=False, type=str)

args = arg_parser.parse_args()

## Ensure the filepath was passed
try: 
    script_dir = os.path.dirname(os.path.abspath(__file__))
    relative = os.path.join("..","templates", "virtualHostFile")
    resolved_path = os.path.join(script_dir , relative)
    absolute_path = os.path.abspath(resolved_path)
except:
    ## Filepath is not defined so exit
    print("Could not load the virtual host template file")
    exit(1)

print(f"Making virtual host file with the domain {args.domain}")

## Open the source file
with open(absolute_path, "rb") as src_file:
    ## Get the lines    
    src_lines = src_file.readlines()

## Open a writeable stream to the destination file
with open(os.path.join(args.sites_available, args.domain), "wb") as destination_file:
    ## Iterate src lines
    for line in src_lines:
        ## Get content with replaced domain
        with_domain = re.sub(r"\{\{DOMAIN\}\}", args.domain, line.decode())
        ## Replace the hash
        with_hash = re.sub(r"\{\{HASH\}\}", args.domain.split(".")[0], with_domain)

        ## Write the contents
        destination_file.write(with_hash.encode())

## Make a sym link with the sites enabled folder
os.symlink(os.path.join(args.sites_available, args.domain), os.path.join(args.sites_enabled, args.domain))