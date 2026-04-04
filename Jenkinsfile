pipeline {
    agent any

    stages {

        stage('Pull Code') {
            steps {
                echo "Fetching code from GitHub..."
                checkout scm
            }
        }

        stage('Prepare Build') {
            steps {
                echo "Preparing application files..."
            }
        }

        stage('Deploy Application') {
            steps {
                bat '''
                mkdir C:\\deploy-app || exit 0
                xcopy /E /I /Y * C:\\deploy-app
                '''
            }
        }

        stage('Archive Files') {
            steps {
                archiveArtifacts artifacts: '**/*', fingerprint: true
            }
        }
    }

    post {
        success {
            echo "Application Deployed Successfully!"
        }
        failure {
            echo "Deployment Failed!"
        }
    }
}
