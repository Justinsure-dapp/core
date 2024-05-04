export default function Functions() {
  return (
    <div className="flex flex-col pt-12 pb-8 gap-y-8 p-page">
      <div className="flex flex-col basis-1/2">
        <h1 className="text-xl border-b border-front/20 pb-1">Claim validation function</h1>
        <p className="mt-2 text-front/60">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
          doloribus distinctio voluptate, recusandae voluptatem nostrum in nulla
          dolorum officia perspiciatis?
        </p>
        <div className="flex flex-col border border-front/40 p-4 hover:bg-foreground/30 duration-300 text-primary rounded-xl w-max mt-4">
          <pre className="text-xs font-mono">
            {`def factorial(n):
    if n == 1
        return 1
    else:
      return n * factorial(n-1)`}
          </pre>
          <button className="text-sm self-end px-3 py-1 rounded-md font-bold mt-4 bg-primary text-back w-max">
            Read More
          </button>
        </div>
      </div>

      <div className="flex flex-col basis-1/2">
        <h1 className="text-xl border-b border-front/20 pb-1">Premium validation function</h1>
        <p className="mt-2 text-front/60">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
          doloribus distinctio voluptate, recusandae voluptatem nostrum in nulla
          dolorum officia perspiciatis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima qui quidem corrupti dolores doloremque ex molestiae officia impedit, quasi rerum aperiam consectetur culpa repellendus a, quod, aspernatur sapiente molestias! Natus!
        </p>
        <div className="flex flex-col border border-front/40 p-4 hover:bg-foreground/30 duration-300 text-primary rounded-xl w-max mt-4">
        <pre className="text-xs font-mono">
              {`def bubble_sort(arr):
n = len(arr)
for i in range(n):
    # Last i elements are already in place
    for j in range(0, n - i - 1):
        # Traverse the array from 0 to n-i-1
        # Swap if the element found is greater
        # than the next element
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Example usage:
my_list = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(my_list)
print("Sorted array is:", my_list)
`}
            </pre>
          <button className="text-sm self-end px-3 py-1 rounded-md font-bold mt-4 bg-primary text-back w-max">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
