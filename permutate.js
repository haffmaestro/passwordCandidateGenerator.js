var fs      = require('fs');
var path    = require('path');
var yargs   = require('yargs').argv;
var assert  = require('assert');

var defaultRecipePath = path.join(__dirname, '/permutations.json');
var defaultResultPath = path.join(__dirname, '/candidates.json');

var recipePath = yargs.recipe || defaultRecipePath;
var resultPath = yargs.result || defaultResultPath;

var recipe = JSON.parse(fs.readFileSync(recipePath,'utf8'));

var results = []

run();
function run(){
  results = generateTree("", recipe);

  try{
    assert.equal(countPermutations(recipe), results.length);
  }catch(e){
    console.log(e);    
  }

  fs.writeFile(resultPath, JSON.stringify(results, null, 4), function(err){});
  console.log("Successfully generated: "+results.length+" candidates");
}

/**
 * Counts the possible permutations for a given recipe
 * @param  {Array} recipe  The recipe for generating candidates
 * @return {Number}        [description]
 */
function countPermutations(recipe){
  return recipe.map(function(optionsForPosition){
    return optionsForPosition.length;
  }).reduce(function(memo, optionNumber){
    return memo*optionNumber;
  });
}

/**
 * Check that given array is an array of arrays;
 * @param  {Array} array [description]
 * @return {Boolean}       [description]
 */
function checkTypes(array){
  return array.map(function(element){
    return Array.isArray(element);
  })
  .reduce(function(memo, bool){
    return memo && bool;
  }, true);
}

/**
 * Generates candidates recursively based on given recipe;
 * @param  {String} sofar Candidate so far
 * @param  {Array}  array Rest of recipe
 */
function generateTree(sofar, array){
  if(!array.length) {
    return sofar;
  }

  if(!checkTypes(array)){
    console.warn("Every position in the given array is not an array");
    return;
  } 

  var current = array[0];
  var rest = array.slice(1);

  return current.map(function(candidatePart){
    return generateTree(sofar+candidatePart, rest);
  }).reduce(function(memo, curr){
    return memo.concat(curr);
  },[]);
}