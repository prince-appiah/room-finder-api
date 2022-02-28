# Shelter API
### Tech Stack
This API was built with ExpressJS, MongoDB(mongoose) as the database.

### Profile Creation (Hosts and Customers)
In this application, there are two main roles (host and customer, excluding the admin). Aside the usual authentication, admin can manually register customers and hosts from their dashboard by entering the user's first name, last name, email and user type. This data will be used to create a user model, then a mongoose hook that has been attached to the user model will handle the creation of user profiles based on the user type. A piece of this hook functionality is shown below:
```js
    userSchema.post("validate", async function(doc,next) {
        if(doc.userType === 'host'){
            await Host.create({user_id:doc._id, email:doc.email})

            next()
        }

        if(doc.userType === 'user'){
            await Customer.create({user_id:doc._id, email:doc.email})

            next()
        }
    })
```

