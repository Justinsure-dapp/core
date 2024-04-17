export default function Functions() {
  return (
    <div className="flex pt-12 pb-8 gap-y-2">
      <div className="flex flex-col gap-y-2 basis-1/2">
        <h1 className="text-xl">Claim validation function</h1>
        <div className="flex flex-col border border-front/40 p-4 hover:bg-foreground/30 duration-300 text-primary rounded-xl w-max">
          <pre className="text-xs font-mono">
            {`function quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
    }
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (i === Math.floor(arr.length / 2)) {
            continue;
        }
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Example usage:
const array = [5, 2, 4, 6, 1, 3];
console.log(quickSort(array)); // Output: [1, 2, 3, 4, 5, 6]
`}
          </pre>
          <button className="text-sm self-end px-2 rounded-xl font-bold mt-4 bg-primary text-back w-max">
            Read More
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 basis-1/2">
        <h1 className="text-xl">Premium calculation function</h1>
        <div className="flex flex-col border border-front/40 p-4 hover:bg-foreground/30 duration-300 text-primary rounded-xl w-max">
          <pre className="text-xs font-mono">
            {`function quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
    }
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (i === Math.floor(arr.length / 2)) {
            continue;
        }
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Example usage:
const array = [5, 2, 4, 6, 1, 3];
console.log(quickSort(array)); // Output: [1, 2, 3, 4, 5, 6]
`}
          </pre>
          <button className="text-sm self-end px-2 rounded-xl font-bold mt-4 bg-primary text-back w-max">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
