def is_prime(num):
    if num <= 1:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

def count_primes(n):
    count = 0
    for i in range(2, n + 1):
        if is_prime(i):
            count += 1
    return count

# Example usage
a=int(input())
print(count_primes(a))  # Output: 4 (Prime numbers: 2, 3, 5, 7)
