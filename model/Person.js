import {Schema,model} from "mongoose"

const personSchema = new Schema ({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]

})

const Person = model("Person", personSchema)
export default Person