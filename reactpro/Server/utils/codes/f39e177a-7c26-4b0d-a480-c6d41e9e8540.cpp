#include <iostream>
#include <vector>

std::vector<int> productExceptSelf(const std::vector<int>& nums) {
    int n = nums.size();
    std::vector<int> output(n, 1);
    
    // Calculate products of elements to the left of each element
    int leftProduct = 1;
    for (int i = 0; i < n; ++i) {
        output[i] = leftProduct;
        leftProduct *= nums[i]
    }
    
    // Calculate products of elements to the right of each element
    int rightProduct = 1;
    for (int i = n - 1; i >= 0; --i) {
        output[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return output;
}

int main() {
    std::vector<int> nums = {1, 2, 3, 4};
    std::vector<int> result = productExceptSelf(nums);

    std::cout << "Output: ";
    for (int val : result) {
        std::cout << val << " ";
    }
    std::cout << std::endl;

    return 0;
}
