let balance = 500.0;

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Sekiro");
console.log("Starting Balance:", myAccount.balance);

console.log("----");

console.log("Attempting to withdraw even $1 should fail...");
const t1 = new Withdrawal(1.0, myAccount);
console.log("Commit Result:", t1.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("----");

console.log("Depositing should always succeed");
const t2 = new Deposit(1000.0, myAccount);
console.log("Commit Result:", t2.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("----");

console.log("Withdrawing should work now because we got money");
const t3 = new Withdrawal(100.0, myAccount);
console.log("Commit Result: ", t3.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("----");

console.log("Ending account Balance: ", myAccount.balance);
console.log(`Looks like ${myAccount.username} still got some money!`);

console.log("----");

console.log("Account Transaction History: ", myAccount.transactions);
