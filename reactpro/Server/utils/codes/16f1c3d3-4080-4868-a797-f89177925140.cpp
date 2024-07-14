#include <iostream>
#include <vector>
#include <algorithm> // Include this header for std::count

// Function to count the number of prime numbers less than n
int countPrimes(int n) {
    if (n <= 2) return 0;
    std::vector<bool> isPrime(n, true);
    isPrime[0] = isPrime[1] = false;

    for (int i = 2; i * i < n; ++i) {
        if (isPrime[i]) {
            for (int j = i * i; j < n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    return std::count(isPrime.begin(), isPrime.end(), true);
}

int main() {
    int n;
    std::cout << "Enter a non-negative number: ";
    std::cin >> n;

    int result = countPrimes(n);
    std::cout << "Number of prime numbers less than " << n << " is: " << result << std::endl;

    return 0;
}
