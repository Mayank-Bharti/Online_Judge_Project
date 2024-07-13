#include <iostream>
using namespace std;

int main() {
    int n;
    n=11;
    int count = 0;
    for (int i = 2; i <= n; ++i) {
        bool isPrime = true;
        for (int j = 2; j <= i / 2; ++j) {
            if (i % j == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            ++count;
        }
    }
    cout << count << endl;
    return 0;
}