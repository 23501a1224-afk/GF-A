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

        // --- NEW TESTING STAGE ---
        stage('Run Tests') {
            steps {
                echo "Running Automated Test Cases..."
                // Executes the Python unittest and displays the output in Jenkins console
                bat 'python run_tests.py'
            }
        }

        stage('Deploy Application') {
            steps {
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
