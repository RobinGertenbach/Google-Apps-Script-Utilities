/**
 * Calculates the mean of two samples when only their mean, and sample size are known.
 * See here: http://www.talkstats.com/showthread.php/7130-standard-deviation-of-multiple-sample-sets
 *
 * @param {5.6} xbar1
 * @param {4.2} xbar2
 * @param {65} n1
 * @param {23} n2
 *
 * @return The mean of the combined samples
 * @customFunction
 */
 
function combineMeans(xbar1, xbar2, n1, n2) {
  return (n1 / (n1 + n2)) * xbar1 + 
         (n2 / (n1 + n2)) * xbar2;
}





/**
 * Calculates the variance of two samples when only their mean, variance and sample size are known.
 * See here: http://www.talkstats.com/showthread.php/7130-standard-deviation-of-multiple-sample-sets
 *
 * @param {5.6} xbar1
 * @param {4.2} xbar2
 * @param {1.2} var1
 * @param {1.6} var2
 * @param {65} n1
 * @param {23} n2
 *
 * @return The variance of the combined Samples
 * @customFunction
 */

function combineVariances(xbar1, xbar2, var1, var2, n1, n2) {    
  return (n1 * n1 * var1 + 
          n2 * n2 * var2 -
          n1 * var1      -
          n1 * var2      -
          n2 * var1      -
          n2 * var2      +
          n1 * n2 * var1 +
          n1 * n2 * var2 +
          n1 * n2 * (xbar1 - xbar2) * (xbar1 - xbar2)) /
          (n1 + n2 - 1) * (n1 + n2);
}
