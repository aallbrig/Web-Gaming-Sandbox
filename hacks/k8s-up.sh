#!/usr/bin/env sh

helm upgrade --install wgs ./kubernetes/helm/web-gaming-sandbox
echo "Check out your site at http://$(minikube ip)"
