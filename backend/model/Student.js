import mongoose from "mongoose";
/*{
    first_name,
    middle_name,
     last_name,
      email,
      password,
      salt
      phone,
      address,
      city,
      state,
      gender,
      profile_img,
      role:'student,


}*/
export const UserSchema  = mongoose.Schema({
    first_name :{
        type:String,
        require:true,
        min:2,
        max:60,
        aggregate:true
    },
    middle_name :{
        type:String,
        require:true,
        min:2,
        max:60
    },
    last_name :{
        type:String,
        require:true,
        min:2,
        max:120
    },
    email :{
        type:String,
        require:true,
        unique:true,
        min:2,
        max:60
    },
    password :{
        type:String,
        require:true,
        min:20,
        max:120,
        select: false
    },
    salt :{
        type:String,
        require:true,
        min:20,
        max:120,
        select: false
    },
    phone: {
        'type': String,
      //  'unique': true,
        'required': true,
    },
    address: {
        'type': String,
        'required': true,
       
    },
    city: {
        'type': String,
        'required': true,
      
    },
    state: {
        'type': String,
        'required': true,
     
    },
    
    gender: {
        'type': String,
        'enum': ['male', 'female'],
        'required' :true
    },
   
    profile_img:{
        'type':String,
         //require:true,
       // 'default':"/public/images/avater/ava.png"
    },
    role :{
        type :String,
        enum:["student","parent","partner","teacher","admin"],
        default:"student"

    },
    age :{
        type :Number,
        require:true
       

    }
    
}, 
 {
    timestamp :true,
    autoCreate: true, 
    autoIndex: true

}
)

///adding custome method to schemma
// UserSchema.methods.__getself  = function __zsaves(){
//     return this;
//     //arrow function will not work

// }


export const Student  =  mongoose.model('User',UserSchema)
//query return  model 
//exec return promise
let get   = async ()=>{
let a  = await Student.find().skip(0).limit(3).sort("-first_name");  
let b  = await Student.find().skip(3).limit(3).sort("-first_name");  
let c  = await Student.find().skip(6).limit(3).sort("first_name");  
console.log(a,"\n",b,"\n",c)  
let d  = Student.find().skip(0).limit(3).sort("-first_name").cursor()//.addCursorFlag('noCursorTimeout', true); ///cursor return generator 
/// and cursor will not close after 10 minute

for (let doc = await d.next();doc != null ; doc = await d.next() ) {
    console.log(doc)
    console.log(doc._id.toString())
}






// for await (const doc of Student.find()) {///this shothand for cursor creation
//     console.log(doc); // Prints documents one at a time
//   }

   
}

//get()

async function runAggregation() {
    try {
      const aggregateResult = await Student.aggregate([
        // Add your aggregation stages here
        // For example:
        { $group: { _id: '$first_name', totalCustomers: { $sum: 1 } } },
        //The field 'first_name' must be an accumulator object ;
        // accumulator object use in aggregation to perform computations and store intermediate results during the aggregation process.
        //the accumulator object is typically used in the $group stage of the aggregation pipeline,
      ]);
  
      console.log(aggregateResult);
    } catch (error) {
      console.error('Aggregation failed:', error);
    } finally {
      mongoose.disconnect();
    }
  }
  
//runAggregation();
 
  let grp  = ()=>{

    const inventory = [
        { name: "asparagus", type: "vegetables", quantity: 5 },
        { name: "bananas", type: "fruit", quantity: 0 },
        { name: "goat", type: "meat", quantity: 23 },
        { name: "cherries", type: "fruit", quantity: 5 },
        { name: "fish", type: "meat", quantity: 22 },
      ];

    let res =   inventory.reduce( (prevRes,curRes)=>{
         prevRes  = prevRes || {}
      let cur  = (prevRes[[curRes.type]]  ||  [] )  // the the array of the grp is present give the array elese create new one
        cur.push(curRes)
       prevRes[[curRes.type]]  = cur //.push(curRes)
          return prevRes
    },{} )

    return res
    //console.log(res)
      
  }

  //console.log(grp())
  


  let calcuteStd  = ()=>{
    Student.aggregate([
        // Group the documents (optional)
        {
          $group: {
            _id: "$age", // Replace with the field to group by (if needed)
            sum: { $sum: "$age" },
            sumOfSquares: { $sum: { $multiply: ["$age", "$age"] } },
            count: { $sum: 1 }
          }
        },
        // Calculate variance and standard deviation
        {
          $project: {
            variance: {
              $divide: [
                { $subtract: [ { $multiply: ["$sumOfSquares", "$count"] }, { $multiply: ["$sum", "$sum"] } ] },
                { $multiply: ["$count", "$count"] }
              ]
            },
            standardDeviation: {
              $sqrt: {
                $divide: [
                  { $subtract: [ { $multiply: ["$sumOfSquares", "$count"] }, { $multiply: ["$sum", "$sum"] } ] },
                  { $multiply: ["$count", "$count"] }
                ]
              }
            }
          }
        }
      ]);
      
  }

  
/*
When you use _id: '$country', you are telling MongoDB to group the documents based on the value of the country field
*/  
  
  
  

// Student.watch().on('change', data => console.log(data));

// const view  = Student.createCollection({
//     viewOn: 'User', // Set `viewOn` to the collection name, **not** model name.
//     pipeline: [
//       {
//         $set: {
//           name: { $concat: [{ $substr: ['$name', 0, 3] }, '...'] },
//           email: { $concat: [{ $substr: ['$email', 0, 3] }, '...'] }
//         }
//       }
//     ]
//   });

// const st  = new Student({first_name:"Azeez_atu"})
// console.dir(Student.Query.base)  // all methods for single object
// console.log(st.__getself().first_name)
/*
The permitted SchemaTypes are:

String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map
UUID*/

/*
Schemas not only define the structure of your document and casting of properties, 
they also define document instance methods, static Model methods, compound indexes, and document lifecycle hooks called middleware.also called pre and post hooks
 
maxPoolSize - The maximum number of sockets the MongoDB driver will keep open for this connection 100
minPoolSize - The minimum number of sockets the MongoDB driver will keep open for this connection
family - Whether to connect using IPv4 or IPv6

Replication set
const conn = mongoose.createConnection('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]', options);

An instance of a model is called a document.
 create a View using createCollection().
 Change streams let you listen for updates to documents in a given model's collection, The watch() function creates a change stream
Subdocuments are documents embedded in other documents
 this means you can nest schemas in other schemas
*/


/*
const childSchema = new Schema({ name: 'string' });
const Child = mongoose.model('Child', childSchema);

const parentSchema = new Schema({
  child: {
    type: mongoose.ObjectId,
    ref: 'Child'
  }
});
const Parent = mongoose.model('Parent', parentSchema);

const doc = await Parent.findOne().populate('child');
// NOT a subdocument. `doc.child` is a separate top-level document.
doc.child;



/ With a JSON doc
await Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  sort({ occupation: -1 }).
  select({ name: 1, occupation: 1 }).
  exec();

// Using query builder
await Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec();


  Aggregation can do many of the same things that queries can

  The Aggregate#pipeline() function lets you access the MongoDB aggregation pipeline that Mongoose will 
  send to the MongoDB server. It is useful for adding stages to the beginning of the pipeline from middleware.
  customerSchema.pre('aggregate', function() {
  // Add a $match state to the beginning of each pipeline.
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

aggregate methods include:

count: This method is used to count the number of documents or rows that match certain criteria.

min and max: These methods are used to find the minimum and maximum values of a particular field in the data.

group by: This method is used to group data based on one or more fields and perform aggregate operations on each group independently.

distinct: This method is used to find the unique values of a particular field in the data.

first and last: These methods are used to retrieve the first or last document or row from a group.

median: This method is used to find the median value of a set of data.

standard deviation and variance: These methods are used to calculate the standard deviation and variance of a set of data, which are measures of data dispersion.

percentile: This method is used to find the value below which a given percentage of data falls.

join: In the context of SQL databases, the join method is used to combine data from two or more tables based on a related field.

pivot: This method is used to transform data from a long format to a wide format, making it easier to analyze and visualize.


MongoDB has the join-like $lookup aggregation
Mongoose has a more powerful alternative called populate()

Population is the process of automatically replacing the specified paths in the
document with document(s) from other collection(s)
paths" refer to the individual fields or properties of a document

Select populate  populate(Sting|object)
What if we wanted to populate multiple paths at the same time?

await Story.
  find({ ... }).
  populate('fans').
  populate('author'). 
  exec();
path fans and author must be difference

Populate with query
await Story.
  find().
  populate({
    path: 'fans',
    match: { age: { $gte: 21 } },
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: 'name -_id'
  }).
  exec();

If you were to populate() using the limit option, you would find that the 2nd story has 0 fans:

const stories = await Story.find().populate({
  path: 'fans',
  options: { limit: 2 },
 // perDocumentLimit: 2
});


Save populate 
await story1.save();
console.log(author.stories)  
author.stories.push(story1);
await author.save();

indept populate 

await User.
  findOne({ name: 'Val' }).
  populate({
    path: 'friends',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'friends' }
  });

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
In this schema, name, email, and age are paths. Each path has a 
specified data type (String, Number, etc.) and can have additional 
attributes like required, unique, and default, 
which define how the data is stored and validated in the MongoDB collection.


 Transactions let you execute multiple operations in isolation and 
 potentially undo all the operations if one of them fails

 const User = db.model('User', new Schema({ name: String }));

let session = null;
return User.createCollection().
  then(() => db.startSession()).
   then(() => {
    session.startTransaction();
    return User.findOne({ name: 'foo' }).session(session);
  }).
  then(user => {
    // Getter/setter for the session associated with this document.
    assert.ok(user.$session());
    user.name = 'bar';
    // By default, `save()` uses the associated session
    return user.save();
  }).





  Aggregate()
Parameters:
[pipeline] «Array» aggregation pipeline as an array of objects
[model] «Model» the model to use with this aggregate.

Aggregate constructor used for building aggregation pipelines. 
Do not instantiate this class directly, use Model.aggregate() instead.
Model.aggregate([pipeline])

In the MongoDB aggregation pipeline, the $project stage is used to shape
 the output of the aggregation by including or excluding specific 
 fields from the documents in the collection. It allows you to create 
 a new document that contains only the fields you need for further processing.

 db.collection.aggregate([
  { $project: { name: 1, age: 0 } }
]);
the documen will include field name and exclude field age


The $project stage is a powerful tool that allows you to reshape and manipulate 
the data during the aggregation process, making it easier to work with the data 
in the subsequent stages of the pipeline.
*/