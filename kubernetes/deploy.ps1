kubectl apply -f frontend.yml
kubectl rollout status deployment/minimal-website  # wait until frontend is ready

kubectl apply -f mysql.yml
kubectl rollout status deployment/custom-mysql   # wait until mysql is ready

kubectl apply -f backend.yml
kubectl rollout status deployment/node-backend # wait until backend is ready

kubectl apply -f service.yml

# Then port-forward
kubectl port-forward svc/minimal-website 80:80
kubectl port-forward svc/custom-mysql 3306:3306
kubectl port-forward svc/node-backend 3305:3305
#.\deploy.ps1

# kubectl create secret generic aws-credentials ` --from-file=credentials="C:\Users\Steve\.aws\credentials" ` --from-file=config="C:\Users\Steve\.aws\config"
# kubectl exec -it node-backend-7fc679ccb8-lwmg9 -- node data-ingest.js


# copy data into database without running data-ingest.js 
# kubectl cp full-backup.sql <mysql-pod-name>:/var/lib/mysql
# kubectl exec  -it custom-mysql-795f6856d7-k5jfw -- bash
# mysql -u root -p"password""

