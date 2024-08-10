import { Schema } from "mongoose";

export const mongoosePlugins = {
  updateVersionIfExists: (schema: Schema<any, any>) => {
    schema.pre('save', function (next) {
      // when save model check that version of the model is the same as in database 
      const versionKey = schema.get('versionKey') as string;
      
      this.$where = {
        ...this.$where,
        [versionKey]: this[versionKey],
      }
      this.increment();
  
      next();
    });
  }
}