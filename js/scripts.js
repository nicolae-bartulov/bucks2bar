document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chartTab = document.getElementById('chart-tab');

    var myChart = new Chart(ctx, {
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

    chartTab.addEventListener('click', function () {
        // Income
        var incomeJan = parseFloat(document.getElementById('income-january').value);
        var incomeFeb = parseFloat(document.getElementById('income-february').value);
        var incomeMar = parseFloat(document.getElementById('income-march').value);
        var incomeApr = parseFloat(document.getElementById('income-april').value);
        var incomeMay = parseFloat(document.getElementById('income-may').value);
        var incomeJun = parseFloat(document.getElementById('income-june').value);
        var incomeJul = parseFloat(document.getElementById('income-july').value);
        var incomeAug = parseFloat(document.getElementById('income-august').value);
        var incomeSep = parseFloat(document.getElementById('income-september').value);
        var incomeOct = parseFloat(document.getElementById('income-october').value);
        var incomeNov = parseFloat(document.getElementById('income-november').value);
        var incomeDec = parseFloat(document.getElementById('income-december').value);

        var incomeData = [incomeJan, incomeFeb, incomeMar, incomeApr, incomeMay, incomeJun, incomeJul, incomeAug, incomeSep, incomeOct, incomeNov, incomeDec];
        console.log(incomeData);

        var expensesJan = parseFloat(document.getElementById('expenses-january').value);
        var expensesFeb = parseFloat(document.getElementById('expenses-february').value);
        var expensesMar = parseFloat(document.getElementById('expenses-march').value);
        var expensesApr = parseFloat(document.getElementById('expenses-april').value);
        var expensesMay = parseFloat(document.getElementById('expenses-may').value);
        var expensesJun = parseFloat(document.getElementById('expenses-june').value);
        var expensesJul = parseFloat(document.getElementById('expenses-july').value);
        var expensesAug = parseFloat(document.getElementById('expenses-august').value);
        var expensesSep = parseFloat(document.getElementById('expenses-september').value);
        var expensesOct = parseFloat(document.getElementById('expenses-october').value);
        var expensesNov = parseFloat(document.getElementById('expenses-november').value);
        var expensesDec = parseFloat(document.getElementById('expenses-december').value);

        var expensesData = [expensesJan, expensesFeb, expensesMar, expensesApr, expensesMay, expensesJun, expensesJul, expensesAug, expensesSep, expensesOct, expensesNov, expensesDec];
        console.log(expensesData);

        myChart.data.datasets[0].data = incomeData;
        myChart.data.datasets[1].data = expensesData;

        myChart.update();
    });

    document.getElementById('download').addEventListener('click', function () {
        var canvas = document.getElementById('myChart');
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'chart.png';
        link.click();
      });
     // input with id "username" on change
    document.getElementById('username').addEventListener('input', function () {
        var username = document.getElementById('username').value;
        // regex to check if the username has at leas 1 capital letter, 1 special character, 1 number and 8 characters
        var regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        // check if the username matches the regex and changes the border color
        if (regex.test(username)) {
            document.getElementById('username').style.borderColor = 'green';
        } else {
            document.getElementById('username').style.borderColor = 'red';
        }
    });
});