import { Schema } from "mongoose";

export const mongoosePlugins = {
  updateVersionIfExists: (schema: Schema<unknown, unknown>) => {
    schema.pre('save', function (next) {
      const versionKey = schema.get('versionKey') as string;
      
      this.$where = {
        ...this.$where,
        [versionKey]: this[versionKey],
      }
      this.increment();
  
      next();
    });
    schema.pre('updateOne', function (next) {
      const versionKey = schema.get('versionKey') as string;
      
      this.updateOne({}, {
        $inc: {
          [versionKey]: 1,
        },
      });
  
      next();
    });
    schema.pre('updateMany', function (next) {
      const versionKey = schema.get('versionKey') as string;
      
      this.updateMany({}, {
        $inc: {
          [versionKey]: 1,
        },
      });
  
      next();
    });
  }
}