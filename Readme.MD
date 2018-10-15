#MCM demo

## Clusters
- Hubcluster: https://158.176.105.236:8443/hcmconsole/
- AWS cluster: https://icp-e526-console-62d49fd43e0570d3.elb.eu-west-2.amazonaws.com:8443

## How to demo
- Deploy mynw-app chart to Hubcluster:
```
$ helm install <chart name>-<version number>.tgz --name <release name> --tls
```
- Get placement policy: `kubectl get pp`
- Edit placement policy to scale replicas and change cluster selector
```
$ kubectl edit pp <placement_policy_name>
```
- Show application view: https://158.176.105.236:8443/hcmconsole/applications/default/mynw-app/topology
- Ping ingresses on hubcluster:
  - https://158.176.105.236/monitoring
  - https://158.176.105.236/creds
- Ping ingresses on awscluster:
  - https://icp-e526-proxy-c1a3ab0c1291f594.elb.eu-west-2.amazonaws.com/monitoring
  - https://icp-e526-proxy-c1a3ab0c1291f594.elb.eu-west-2.amazonaws.com/creds

## To-do
- Add application components to MCM application
- Chart is not deployable from UI, but on Helm CLI
- Move images from AWS docker to ICP docker registry on 158.176.105.236

## How to build and deploy applications
- Create secrets to pull docker image from repo:
```
$ kubectl create secret docker-registry regsecret --docker-server=icp-e526-console-62d49fd43e0570d3.elb.eu-west-2.amazonaws.com:8500/default/monitoring --docker-username=admin --docker-password=<admin token> --docker-email=test@mail.com
```
```
$ kubectl create secret docker-registry regsecret-creds --docker-server=icp-e526-console-62d49fd43e0570d3.elb.eu-west-2.amazonaws.com:8500/default/monitoring --docker-username=admin --docker-password=<admin token> --docker-email=test@mail.com
```
- Package components via `helm package` and upload them to this git repo
- Point deployable files to the charts in this github repository
- Update version number
- Package application: `helm package mynw-app`
- Upload chart to ICP hubcluster:
```
$ cloudctl catalog load-chart --archive <chart name>-<version number>.tgz
```
