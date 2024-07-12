#include <iostream>
#include <cmath>

using namespace std;

// Function to check if a number is prime
bool isPrime(int num) {
    if (num <= 1) return false;
    if (num == 2) return true;
    if (num % 2 == 0) return false;
    for (int i = 3; i <= sqrt(num); i += 2) {
        if (num % i == 0) return false;
    }
    return true;
}

int main() {
    int N=10;
    //cout << "Enter the value of N: ";
    //cin >> N;

    int count = 0;
    for (int i = 2; i <= N; ++i) {
        if (isPrime(i)) {
            count++;
        }
    }

    cout << "Number of prime numbers up to " << N << " is " << count << endl;
    return 0;
}
