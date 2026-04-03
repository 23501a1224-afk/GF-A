pipeline {
    agent any

    stages {

        stage('Pull Code') {
            steps {
                echo "Pulling the code from GitHub..."
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("girls-accessories-app:latest")
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker rm -f girls-accessories || true'
                    sh 'docker run -d -p 8080:80 --name girls-accessories girls-accessories-app:latest'
                }
            }
        }
    }

    post {
        success {
            echo "Deployment Completed Successfully!"
        }
        failure {
            echo "Deployment Failed!"
        }
    }
}
