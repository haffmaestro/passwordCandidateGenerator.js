## Password Permutation Generator

Generates and array of possible permutations based on passed arguments

This works well if you kind of know what your password is, but have a certain amount
of possible permutations you could've made to it.

Takes a json file, outputs a json file.

Permutations recipe is in the following format, each array in the parent represents a spot in the password.
The input of: 
`[["a", "A"],["fu","FU", "fU"],["$", "3"]]`

Would produce the following output
```
[
    "afu$",
    "afu3",
    "aFU$",
    "aFU3",
    "afU$",
    "afU3",
    "Afu$",
    "Afu3",
    "AFU$",
    "AFU3",
    "AfU$",
    "AfU3"
]
```

This was generated with the following command: `node permutate.js --recipe=testPermutations.json --result=testCandidates.json`
The test files are supplied in this repo.

### How to use

`git clone`
`npm install`
`node permutate.js --recipe=<path to permutations> --result=<path to result>`