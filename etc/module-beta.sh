#!/bin/bash

echo Updating beta module...
viam module update --module=meta-beta.json
echo Done

module_id=$(jq -r '.module_id' meta-beta.json)
org_namespace=${module_id%%:*}
echo "Organization namespace is: $org_namespace"

date=$(date +%Y%m%d%H%M%S)
version="1.0.0-${date}"
echo "Version is: $version"

viam module upload --module=meta-beta.json --version=${version} --platform=any --public-namespace=${org_namespace} dist