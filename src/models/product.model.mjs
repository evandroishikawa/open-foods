import { model, Schema } from 'mongoose'

const productSchema = new Schema({
  code: Number,
  status: {
    type: String,
    enum: ['draft', 'trash', 'published'],
    default: 'draft'
  },
  imported_t: Date,
  url: String,
  creator: String,
  created_t: Number,
  last_modified_t: Number,
  product_name: String,
  quantity: String,
  brands: String,
  categories: String,
  labels: String,
  cities: String,
  purchase_places: String,
  stores: String,
  ingredients_text: String,
  traces: String,
  serving_size: String,
  serving_quantity: Number,
  nutriscore_score: Number,
  nutriscore_grade: {
    type: String,
    enum: ['a', 'b', 'c', 'd', 'e'],
    default: 'e'
  },
  main_category: String,
  image_url: String
})

export const Product = model('Product', productSchema)
