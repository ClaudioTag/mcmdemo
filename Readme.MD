#MCM demo

## Clusters
- Hubcluster: https://184.172.241.11:8443/hcmconsole/
- AWS cluster: https://icp-e526-console-62d49fd43e0570d3.elb.eu-west-2.amazonaws.com:8443

## How to demo
- Deploy monitoring-mcm chart to Hubcluster
- Get placement policy: `kubectl get pp`
- Edit placement policy to scale replicas and change cluster selector
```
$ kubectl edit pp <placement_policy_name>
```
- Show application view" https://184.172.241.11:8443/hcmconsole/applications/default/mynw-monitoring/topology
- Ping ingress on hubcluster: https://184.172.241.11/monitoring-mcm/
- Ping ingress on awscluster: https://icp-e526-proxy-c1a3ab0c1291f594.elb.eu-west-2.amazonaws.com/monitoring-mcm

## To-do
- Add application components to MCM application
- Chart is not deployable from UI, but on Helm CLI

## How to build and deploy applications
- Create secret to pull docker image from repo:
```
$ kubectl create secret docker-registry regsecret --docker-server=icp-e526-console-62d49fd43e0570d3.elb.eu-west-2.amazonaws.com:8500/default/monitoring --docker-username=admin --docker-password=<admin token> --docker-email=test@mail.com
```
- Package components via `helm package` and upload them to this git repo
- Point deployable files in `monitoring-mcm/templates` to the uploaded charts
- Update version number
- Package application: `helm package monitoring-mcm`
- Upload chart to ICP hubcluster:
```
$ cloudctl catalog load-chart --archive monitoring-mcm-<version number>.tgz
```
- Deploy chart from CLI:
```
$ helm install monitoring-mcm-<version number>.tgz --name <release name> --tls
```
