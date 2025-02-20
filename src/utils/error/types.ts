export interface MongoError {
  code?: number;
  errmsg?: string;
  keyPattern?: Record<string, number>;
  keyValue?: Record<string, string>;
}
