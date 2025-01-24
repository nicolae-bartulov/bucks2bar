document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.querySelector('#myChart').getContext('2d');
    const chartTab = document.querySelector('#chart-tab');

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Income',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Expenses',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    chartTab.addEventListener('click', () => {
        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const incomeData = months.map(month => parseFloat(document.querySelector(`#income-${month}`).value) || 0);
        const expensesData = months.map(month => parseFloat(document.querySelector(`#expenses-${month}`).value) || 0);

        console.log(incomeData);
        console.log(expensesData);

        myChart.data.datasets[0].data = incomeData;
        myChart.data.datasets[1].data = expensesData;

        myChart.update();
    });

    document.querySelector('#download').addEventListener('click', () => {
        const canvas = document.querySelector('#myChart');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'chart.png';
        link.click();
    });

    document.querySelector('#username').addEventListener('input', () => {
        const username = document.querySelector('#username').value;
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        document.querySelector('#username').style.borderColor = regex.test(username) ? 'green' : 'red';
    });

    // Function to generate chart and get base64 image
    function generateChartAndSendEmail() {
        const canvas = document.querySelector('#myChart');
        const chartImage = canvas.toDataURL('image/png');
        const email = document.getElementById('email-address').value;

        // Send the base64 image to the server
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: chartImage, email: email })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Email sent successfully!');
                } 
                else if (data.error === 'Invalid email address') {
                    alert('Failed to send email. Invalid email address.');
                }
                else if (data.error === 'Invalid image data') {
                    alert('Failed to send email. Invalid image data.');
                }
                else if (data.error === 'Too many requests from this IP, please try again after 15 minutes') {
                    alert('Failed to send email. Too many requests from this IP, please try again after 15 minutes.');
                }
                else {
                    alert('Failed to send email. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    // Add event listener for the send email button
    document.querySelector('#send-email').addEventListener('click', generateChartAndSendEmail);
});