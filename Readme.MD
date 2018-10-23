# Nationwide MCM PoC - Phase 2: myNationwide

<img align="left" src="https://raw.githubusercontent.com/ClaudioTag/mcmdemo/master/mynw-backend/mynw-app/icon.png?sanitize=true" width="200" height="200" />


## Clusters
- Hubcluster: https://184.172.241.11:8443/hcmconsole/
- AWS cluster: https://icp-e526-console-62d49fd43e0570d3.elb.eu-west-2.amazonaws.com:8443

## How to demo
- Deploy mynw-app chart to Hubcluster (via CLI or from ICP catalogue):
```
$ helm install <chart name>-<version number>.tgz --name <release name> --tls
```
- Get placement policy: `kubectl get pp`
- Edit placement policy to scale replicas and change cluster selector
```
$ kubectl edit pp <placement_policy_name>
```
- Show application view: https://184.172.241.11:8443/hcmconsole/applications/default/mynw-app/topology
- Ping ingresses on hubcluster:
  - https://184.172.241.11/monitoring
  - https://184.172.241.11/creds
- Ping ingresses on awscluster:
  - https://icp-e526-proxy-c1a3ab0c1291f594.elb.eu-west-2.amazonaws.com/monitoring
  - https://icp-e526-proxy-c1a3ab0c1291f594.elb.eu-west-2.amazonaws.com/creds
- Show application via mobile front end

## How to build and deploy applications
- Get AWS token to access docker registry:
  - Login to AWS account: 038180458258
  - Go here https://console.aws.amazon.com/iam/home?region=eu-west-1#/users
  - Click on name > Security Credentials > Create access key
  - Type `aws configure` in terminal and use the following values:
    - Fill out key and secret from the above step
    - `Default region` = `eu-west-1`
    - Leave all other options as default (just press enter)
  - Type `aws --region eu-west-1 ecr get-login --no-include-email` to attain login token
- In both clusters, create the following 3 secrets to pull docker image from AWS repo:
```
$ kubectl create secret docker-registry regsecret-chatbot --docker-server=038180458258.dkr.ecr.eu-west-1.amazonaws.com/chatbot --docker-username=AWS --docker-password=<AWS token> --docker-email=test@mail.com
```
```
$ kubectl create secret docker-registry regsecret-creds --docker-server=038180458258.dkr.ecr.eu-west-1.amazonaws.com/creds --docker-username=AWS --docker-password=<AWS token> --docker-email=test@mail.com
```
```
$ kubectl create secret docker-registry regsecret --docker-server=038180458258.dkr.ecr.eu-west-1.amazonaws.com/monitoring --docker-username=AWS --docker-password=<AWS token> --docker-email=test@mail.com
```
- Package components via `helm package` and upload them to this git repo
- Point deployable files to the charts in this github repository
- Update version number
- Package application: `helm package mynw-app`
- Upload chart to ICP hubcluster:
```
$ cloudctl catalog load-chart --archive <chart name>-<version number>.tgz
```
