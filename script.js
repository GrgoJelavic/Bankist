'use strict';

// Data
const account1 = {
    owner: 'Test Testic',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2021-02-15T17:01:17.194Z',
        '2021-02-17T23:36:17.929Z',
        '2021-02-19T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'de-DE',
};
const account2 = {
    owner: 'Ana Anic',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};
const account3 = {
    owner: 'Mate Matic',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'HRK',
    locale: 'hr-HR',
};
const account4 = {
    owner: 'Iva Ivic',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z', ,
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'EUR',
    locale: 'en-GB',
};
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Functions
const displayMovements = function(acc, sort = false) {

    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    movs.forEach(function(mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementsDate(date, acc.locale);

        const formattedMovement = formatCurrencies(mov, acc.locale, acc.currency)

        const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                <div class="movements__date">${displayDate}</div>
                <div class="movements__value">${formattedMovement}</div>
            </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const formatMovementsDate = function(date, locale) {
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    const daysPassed = calcDaysPassed(new Date(), date);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat(locale).format(date);
}

const formatCurrencies = function(value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
}

const calcDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

    labelBalance.textContent = formatCurrencies(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function(acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCurrencies(incomes, acc.locale, acc.currency);

    const outcomes = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatCurrencies(Math.abs(outcomes), acc.locale, acc.currency);

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCurrencies(interest, acc.locale, acc.currency);
};

const createUsernames = function(accs) {
    accs.forEach(function(acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    })
}
createUsernames(accounts);

const updateUserInterface = function(account) {
    displayMovements(account);

    calcDisplayBalance(account);

    calcDisplaySummary(account);
}

const startLogoutTimer = function() {
    let time = 120;
    const tick = function() {

        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);

        labelTimer.textContent = `${min}:${sec}`;

        if (time === 0) {
            clearInterval(timer);
            labelWelcome.textContent = '`Login to get started';
            containerApp.style.opacity = 0;
        }
        time--;
    }
    tick();
    const timer = setInterval(tick, 1000);

    return timer;
};

//Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function(e) {
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);

    if (currentAccount && currentAccount.pin === +inputLoginPin.value) {
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    };
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    }
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    updateUserInterface(currentAccount);
});

btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();

    const amount = +inputTransferAmount.value;
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';

    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc.username !== currentAccount.username
    ) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        currentAccount.movementsDates.push(new Date());
        receiverAcc.movementsDates.push(new Date());
    };

    updateUserInterface(currentAccount);

    clearInterval(timer);
    timer = startLogoutTimer();
});

btnLoan.addEventListener('click', function(e) {
    e.preventDefault();

    const amount = Math.floor(inputLoanAmount.value);

    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

        setTimeout(function() {
            currentAccount.movements.push(amount);

            currentAccount.movementsDates.push(new Date());

            updateUserInterface(currentAccount);

            clearInterval(timer);
            timer = startLogoutTimer();
        }, 5000);
    }
    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e) {
    e.preventDefault();

    if (
        inputCloseUsername.value === currentAccount.username &&
        +inputClosePin.value === currentAccount.pin
    ) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);

        accounts.splice(index, 1);

        containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function(e) {
    e.preventDefault();

    displayMovements(currentAccount, !sorted);

    sorted = !sorted;
})

// const num = 388456565543.23

// console.log('Croatia: ', new Intl.NumberFormat('hr-HR').format(num));

// const deposits = currentAccount.movements.filter(function(mov) {
//     return mov > 0;
// })

// const withdrawals = currentAccount.movements.filter(mov => mov < 0);

// const balance = currentAccount.movements.reduce((acc, curr) => acc + curr, 0);

// const maxMov = currentAccount.movements.reduce((acc, mov) => {
//     if (acc > mov) return acc;
//     else return mov
// }, currentAccount.movements[0]);

// //console.log(maxMov);

// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

// const eurToUsd = 1.1;
// const totalDepositsUSD = currentAccount.movements
//     .filter(mov => mov > 0)
//     .map(mov => mov * eurToUsd)
//     .reduce((acc, mov) => acc + mov, 0)