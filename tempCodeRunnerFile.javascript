let a = 100
let b = 0

for(let i = 0; i < 12; i++) {
    b += a/2
    a -= a/2
    a += b/2
    b -= a/2
    console.log(a, b)
}