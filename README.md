## Enable deployment
      1. Set All enviroment variables in Gitlad ci Variable (Setting > CI / CD > Variables).
         Declare all variable to (*) all enviroment or master, staging , .... n 
        - DOCKER_PASSWORD 
        - DOCKER_USER
        - NAMESPACE    # namespace in kubernete cluster
        - SERVICE_NAME # service name use to generate url in subdomine
        - NODE_ENV # enviroment to get config app (staging, production, default)
        - SSH_PRIVATE_KEY # ssh to pull private dependences
        - DOCKER_REPOSITORY # path to reprository to push image of project 
      -----------------------------------------------------------------------------
        all this variables are needder to deploy this project
        
      2. All files needder are this.
        - Dockerfile
        - Kubernetes-namespace.yaml
        - Kubebernetes-deploy.yaml 
        - .gitlab-ci.yml
        
      3. Tha's it!!
