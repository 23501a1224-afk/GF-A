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
                // Using 'if not exist' is safer for Windows BAT scripts in Jenkins
                bat '''
                if not exist "C:\\deploy-app" mkdir C:\\deploy-app
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
