# GCP Kubernetes Multi-Tier Application Deployment (NAGPKubernetesAssignment)

This project demonstrates a multi-tier application deployed on **Google Kubernetes Engine (GKE)**. It includes:

- A **MySQL Database Tier** deployed via StatefulSet with persistent storage.
- A **Node.js Service API Tier** deployed via Deployment (with 4 replicas).
- Use of **ConfigMaps** and **Secrets** to externalize configurations.
- **Ingress** to expose the API service externally.
- Full support for rolling updates, pod recovery, and persistent data.

---

## 📁 Repository Structure

```bash

my-k8s-project/
├── app/                   # Node.js app code (service tier)
│   └── ...
├── docker/                # Docker-related files like Dockerfile, .dockerignore
│   └── ...
├── k8s/                   # Kubernetes-related manifests 
│   ├── mysql/             # MySQL (database tier) configs
│   │   └── ...
│   └── service/           # Node.js (service tier) configs
│       └── ...
├── docker-compose.yml     # (Optional) Compose for local dev/testing
└── README.md

```

---

## 🔗 Links

- **Code Repository**: [GitHub Repo Link](https://github.com/mridhulbhambri-nagarro/nagp-kubernetes-assignment)  
- **Docker Hub Image(s)**: [Docker Hub Repo Link](https://hub.docker.com/r/mridhulbhambri/node-app)  
- **Live API Service URL**: [Service API Endpoint](http://service.node/users)

---

## ⚙️ Technologies Used

| Component        | Tool/Service                |
|------------------|-----------------------------|
| Cluster          | Google Kubernetes Engine (GKE) |
| Backend DB       | MySQL via StatefulSet        |
| API Tier         | Node.js + Express            |
| Config Management| ConfigMaps, Secrets          |
| Storage          | GCP Persistent Disks (PVCs)  |
| External Access  | Kubernetes Ingress           |

---

## 🧪 Testing Scenarios & Demos

📽️ **Screen Recording** - [Recording Link](https://nagarro-my.sharepoint.com/:v:/p/mridhul_bhambri/EVedaz7ZA-ZAqCOnp3CaN78BGDlhlWGbPDwbUxGZH0HpkQ)

| Scenarios Covered                                                        |
|--------------------------------------------------------------------------|
| Show all deployed Kubernetes objects and their current state             |
| Make an API call that retrieves data from the MySQL database             | 
| Kill an API pod and show the Deployment brings it back automatically     |
| Kill the MySQL pod and verify that: <br>1. It recovers via StatefulSet <br>2. Old data is retained (PVC is working) |


---

## 🚀 How to Deploy on GCP (Step-by-Step)

### 1. Prerequisites

- GCP project with billing enabled or free tier
- `gcloud` CLI installed and authenticated
- `kubectl` configured via `gcloud`
- `docker` installed and Docker Hub account ready

---

### 2. Setup GKE Cluster

```bash
gcloud container clusters create multi-tier-cluster \
    --num-nodes=#size \
    --zone=#zone

gcloud container clusters get-credentials multi-tier-cluster \
    --zone=#zone
```
### 3. Push Docker Image

```bash

docker build -t <your-dockerhub-username>/service-api:latest ./app
docker push <your-dockerhub-username>/service-api:latest

```

### 4. Deploy Kubernetes Manifests

Use below command to apply the manifests. 
Note - These are only sample file names. Please refer to real names from service gcp directory.

```bash

kubectl apply -f k8s/mysql-configmap.yml
kubectl apply -f k8s/mysql-secret.yml
kubectl apply -f k8s/mysql-statefulset.yml
kubectl apply -f k8s/mysql-service.yml

kubectl apply -f k8s/service-configmap.yml
kubectl apply -f k8s/service-secret.yml
kubectl apply -f k8s/service-deployment.yml
kubectl apply -f k8s/service-service.yml

```
### 5. Setting up Ingress

```bash

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml

kubectl apply -f 05-service-ingress.yaml

```

### 5. Verify Setup

```bash

kubectl get all
kubectl get ingress

```

### 6. Cleanup (Optional)

```bash

gcloud container clusters delete multi-tier-cluster --zone=us-central1-c

```
