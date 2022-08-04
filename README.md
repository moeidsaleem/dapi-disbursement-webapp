# DAPI Integraiton



User --> Signup --> Login with Bank --> getIdentity() (enter bank login credentials)
--> (select Account) --> [Save this info to our db -mongodb]
--> Dashboard Screen-


- id against his account that is needed to make transactions.
- 


# TEST CASE

- moeidsaleem (senderID) - "hsjxOUkn60PmJqIe+gcbHiwuA4lHBa+Um301PMokzanhOj79vjnkIkjLDjOJsAFz7T4xj6IlggZAm0HAPXZ/Sw=="
- devon (receiverID) - "PhfPpEnfM5fYEQ/upap8n8H0oQ9loAKBFi1QvMcgu0SELC7ZanAeFSF1zk7Xilu4ByHuyYCl8jfKFFMycnpvnA=="
- Receiver (receiversAccountNumber) - "1658412789537604456811"
- iban  (receiversIBAN) - "DAPIBANKAEMSHRQ1658412789537604456811"
- amount - 10000
- remarks - (will reate a new Transaciton with Id to be passed here) - "pennysent-transaction-103349"


## Flow 


- Create a Circle ( name, description, amount , participants[] ) 'Pay for app', 'need to dev an app', 10000
- payCircleMoney(amount/numberOfGuestParticipants) ((host wont pe paying))  10000/3 = 3333.3 AED
- Add a pay button to the circle card and with email all users can see that circle and make payment based on above criteria. 
