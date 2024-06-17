import os
import argparse
import re
import sys

## Setup an arg parser
arg_parser = argparse.ArgumentParser()

arg_parser.add_argument("--hash", "-H", help="The commit hash for this deployment", required=True, type=str)
arg_parser.add_argument("--domain", "-d", help="The domain", required=True, type=str)

## Get our args
args = arg_parser.parse_args()

script_dir = os.path.dirname(os.path.abspath(__file__))
env_template_filepath = os.path.abspath(os.path.join(script_dir, "..", "templates", ".env.example"))
project_Root = os.path.abspath(os.path.join(script_dir, ".."))
upstream_filepath = "/etc/nginx/conf.d/upstream.conf"
## Init last port
port = None

## Open the file in append mode
with open(upstream_filepath, "a") as file:

    port_regex = r"server\s+127\.0\.0\.1:(\d+);"
    contents = open(upstream_filepath, "r").read()
    portMatches = re.finditer(port_regex, contents, flags=re.MULTILINE)

    ## Iterate matches from the arse end
    for match in reversed(list(portMatches)):
        ## Set the last port
        port = int(match.group(1)) + 1
        break

    file.write(f"\n## Making Stuffs Strapi Auto Deploy \nupstream {args.hash} {{\n    server 127.0.0.1:{port};\n}}")

## Copy the default env
with open(os.path.join(project_Root, ".env"), "wb") as new_env:
    with open(env_template_filepath, "r") as file:
        env_contents = file.readlines()
        for line in env_contents:
            new_env.write(line.encode())
        ## Close the template
        file.close()

    ## Write the api url and the port
    new_env.write(f"\nAPI_URL=\"https://{args.domain}\"".encode())
    new_env.write(f"\nPORT={port}\n".encode())
    new_env.close()
