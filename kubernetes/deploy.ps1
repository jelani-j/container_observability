# run all deployments
kubectl apply -f frontend.yml
kubectl apply -f backend.yml
kubectl apply -f mysql.yml
kubectl apply -f service.yml

# Port-forward minimal-website service port 80 to local port 80
kubectl port-forward svc/minimal-website 80:80
