export default class MergeSort<T> {
   protected callback:  (left: T, right: T) => boolean;

   public constructor(callback: (left: T, right: T) => boolean) {
       this.callback = callback;
   }

   public sort(data: T[]): T[] {

       if (data.length > 1) {
           const middle = Math.floor(data.length / 2);
           return this.merge(data.splice(0, middle), data.splice(middle));
       }

       return data;
   }

    public merge(left: T[] | undefined, right: T[] | undefined): T[] {
       const result: T[] = [];

       if (!left && right) {
           return right;
       }

       if (!right && left) {
           return left;
       }

       if (!right && !left) {
           return result;
       }

       left = left as T[];
       right = right as T[];


        while (left.length > 0 && right.length > 0) {
            if (this.callback(left[0], right[0])) {
                const el = left?.shift() as T;
                el && result.push(el);
            } else {
                const el = right?.shift() as T;
                el && result.push(el);
            }
        }

        return [...result, ...left, ...right];
    }
}