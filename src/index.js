module.exports = function solveSudoku(matrix) {
  function eq(array1,array2) {
    return (array1.length === array2.length && array1.sort().every(function(value, index) {
      return value === array2.sort()[index];
    }));
  }

  function openCaple(a,b) {
    //по строке
    for (let n = 1; n < (9-b); n++) {
      if (eq(arr[a][b], arr[a][b+n])) {
        for (let k = 0; k < 9; k++) {
            if((eq(arr[a][k],arr[a][b]) === false) && (arr[a][k].length > 1)) {
            arr[a][k] = arr[a][k].filter(e => !~arr[a][b].indexOf(e));
          }
        }
      }
    }

    //по столбцу
    for (let n = 1; n < (9 - a); n++) {
      if (eq(arr[a][b], arr[a+n][b])) {
        for (let k = 0; k < 9; k++) {
          if((eq(arr[k][b],arr[a][b]) === false) && (arr[k][b].length > 1)) {
            arr[k][b] = arr[k][b].filter(e => !~arr[a][b].indexOf(e));
          }
        }
      }
    }
  }

  function elemSq(c,d) {
    const arr3 = [];
    let m, p;
    if (c < 3) {
      p = 0;
    } else {
      if (c < 6) {
        p = 3;
      } else {
        p = 6;
      }
    }

    if (d < 3) {
      m = 0;
    } else {
      if (d < 6) {
        m = 3;
      } else {
        m = 6;
      }
    }

    for (let k = p; k < (p+3); k++) {
      for (let n = m; n < (m+3); n++) {
        arr3.push(arr[k][n]);
      }
    }

    return arr3;
  }

  function delElem(a,b) { 
    const arrSec = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    //по строке
    for (let k = 0; k < arrSec.length; k++) {
      for (let n = 0; n < 9; n++) {
        if (arrSec[k] === arr[a][n]) {
          arrSec.splice(k,1);
          k--;
          break;
        }
      }
    }

    //по столбцу
    if (arrSec.length > 1) {
      for (let k = 0; k<arrSec.length; k++) {
        for (let n = 0; n<9; n++) {
          if (arrSec[k] === arr[n][b]) {
            arrSec.splice(k,1);
            k--;
            break;
          }
        }
      }
    }

    //по квадрату
    if (arrSec.length > 1) {
      const arr4 = elemSq(a,b);
      for (let x = 0; x < arrSec.length; x++) {
        for (let y = 0; y < 9; y++) {
          if (arrSec[x] === arr4[y]) {
            arrSec.splice(x,1);
            x--;
            break;
          }
        }
      }
    }

    return arrSec;
  }

  const arr = matrix;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (arr[i][j] === 0) {
          const arr1 = delElem(i,j);
           if (arr1.length === 1) {
             arr[i][j] = arr1[0];
             i = 0;
             j = 0;
           } 
        }
      }
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (arr[i][j] === 0) {
          const arr1 = delElem(i,j);
          if (arr1.length === 1) {
            arr[i][j] = arr1[0];
          } else {
            arr[i][j] = arr1;
          }
        }
      }
    }

    for (let l = 0; l < 9; l++) {
      for (let m = 0; m < 9; m++) {
        if(arr[l][m].length === 2){
          openCaple(l,m);
      }
    }
  }
  return arr;
}
