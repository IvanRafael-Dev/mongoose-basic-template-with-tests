export default interface IModel<T> {
  create(body: T): Promise<T>;
  readOne(_id: string): Promise<T | null>;
}