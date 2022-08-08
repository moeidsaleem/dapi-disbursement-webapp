
# DAPI x PennySent


- Create a Circle ( name, description, amount , users[] ) 'Pay for app', 'need to dev an app', 10000
- payCircleMoney(amount/numberOfGuestParticipants) ((host wont pe paying))  10000/3 = 3333.3 AED

## LOGIC For flow

Please make sure you understand the whole flow in order to make penny sent logic of circles. We will keep most of the logic on DAPI itself
except for circles workflow which we will in our database.

- Login user with dapi  `dapiHandler.open()` which will get the `ba` the bank account object required for use. Save it in context. 
- user can now log into the app with the selected Bank. I am also authenticating them to annoymous ID in a provider(firebase auth). 
- User then needs to add beneficiary in order to add someone to a circle.


## Creating a Circle

Following are fields to create a circle but before creating it, you must prefetch the beneficaries with `ba.payment.getBeneficiaries()`, 
and them in a list for user to add them to circle's users.

- circle name
- circle description
- circle amount
- circle users
- creator <> This is the identity object you must save from `ba.data.getIdentity().identity` of current loggedIn user.
- creatorId <> this is id for fast reference <>


## Circle Users

 Every user needs to have a account number and other important details in order to make payment mainly autoTransfer. 
Every user in the array is basically a beneficiary with addtional fields:

- status == "paid" || "unpaid"

### Creator

- This is the beneficiary object that must be saved in order to make `ba.payment.autoTransfer(transfer)`.

Transfer object looks like this:

``` JS
var transfer = {
    senderID: "",
    amount: 0,
    remarks: "",
    beneficiary: {
      name: "Mohammad Omar Amr",
      nickname: "Mohammad Omar LIV",
      iban: "DAPIBANKAELIV1619116273261987517393",
      accountNumber: "1619116273261987517393",
      swiftCode: "DAPIBANK_AE_LIV",
      address: {
          line1: "Maryam Street",
          line2: "Abu Dhabi",
          line3: "United Arab Emirates"
      },
      country: "AE",
      branchAddress: "Dubai Mall",
      branchName: "Main Branch"  
    }
  }
  ```

## Transfer

Following will be the function for making transfers to added beneficiaries mainly in circle `ba.payment.transferAutoflow(transfer)`.

To directly send money to a beneficiary you can use the basic `ba.payment.createTransfer(transfer)`.



## Transactions

In order to manage transactions against user account `ba.data.getTransactions(accountID, "2020-01-01", "2020-02-01")`


## Remark 

Their is a field in dapi tranfer called `remark` which allows us to enter anything for reference, we need to pass in the `circleId` for reference.


### TEST CASE


- acountID = hsjxOUkn60PmJqIe+gcbHiwuA4lHBa+Um301PMokzanhOj79vjnkIkjLDjOJsAFz7T4xj6IlggZAm0HAPXZ/Sw==
- 