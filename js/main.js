var f_coefficient = new Array(); //f(x)の係数を格納する配列
var f_degree = new Array(); //f'(x)の次数を格納する配列

var df_coefficient = new Array(); //f'(x)の係数を格納する配列
var df_degree = new Array(); //f'(x)の次数を格納する配列

// 次数確定が押された時の処理
function getDegreeValue(name) {
    // a1入力欄の追加
    var a1 = document.getElementById('a1')
    var newElement = document.createElement("span"); // p要素作0
    var newContent = document.createTextNode("x0="); // テキストノードを作成
    newElement.appendChild(newContent); // p要素にテキストノードを追加
    a1.appendChild(newElement);
    var a1_input_data = document.createElement('input');
    a1_input_data.type = 'number';
    a1_input_data.value = "1";
    a1_input_data.name = 'a1';
    a1_input_data.step = '0.1';
    a1.appendChild(a1_input_data);

    // ε入力欄の追加
    var epsilon = document.getElementById('epsilon')
    var newElement = document.createElement("span"); // p要素作成
    var newContent = document.createTextNode("ε="); // テキストノードを作成
    newElement.appendChild(newContent); // p要素にテキストノードを追加
    epsilon.appendChild(newElement);
    var epsilon_input_data = document.createElement('input');
    epsilon_input_data.type = 'number';
    epsilon_input_data.value = "0.0001";
    epsilon_input_data.name = 'epsilon';
    epsilon_input_data.step = '0.0001';
    epsilon.appendChild(epsilon_input_data);

    //inputオブジェクトを取得する
    var degree = document.getElementsByName(name);
    if (degree[0].value == "") {
        alert("次数を入力してください");
        return;
    }

    // 係数を入力するinut要素の動的追加
    for (let n = degree[0].value; n > 0; n--) {
        var parent = document.getElementById('choices');
        var input_data = document.createElement('input');
        input_data.type = 'number';
        input_data.value = "";
        input_data.name = 'coefficient';
        parent.appendChild(input_data);

        var newElement = document.createElement("span"); // p要素作成
        var newContent = document.createTextNode("x^" + n + " + "); // テキストノードを作成
        newElement.appendChild(newContent); // p要素にテキストノードを追加
        parent.appendChild(newElement);
    }
    var parent = document.getElementById('choices');
    var input_data = document.createElement('input');
    input_data.type = 'number';
    input_data.value = "";
    input_data.name = 'coefficient';
    parent.appendChild(input_data);

    //display:none解除
    var hidden = document.getElementById('hidden');
    hidden.classList.add("display");
}

// 係数確定が押された時の処理
function getInputValue(name) {
    // a1の値を抽出
    var a1 = document.getElementsByName("a1");
    a1 = a1[0].value;
    if (a1 == "") {
        alert("a1の値を入力してください");
        return;
    }

    // εの値を抽出
    var epsilon = document.getElementsByName("epsilon");
    epsilon = epsilon[0].value;
    if (epsilon == "") {
        alert("εの値を入力してください");
        return;
    }

    //inputオブジェクトを取得する
    var n = 0;
    var coefficient = document.getElementsByName(name);

    //f(x)の係数を格納する
    for (var i = coefficient.length - 1; i >= 0; i--) {
        f_coefficient[n] = coefficient[i].value;
        if (f_coefficient[n] == "") {
            alert("係数を全て入力してください");
            return;
        }
        n++;
    }

    //xの答え出力
    var answer = newtonMethod(a1, epsilon, f_coefficient, df(f_coefficient));

    var parent5 = document.getElementById('answer');
    var newElement5 = document.createElement("span"); // p要素作成
    var newContent5 = document.createTextNode(answer); // テキストノードを作成
    newElement5.appendChild(newContent5); // p要素にテキストノードを追加
    parent5.appendChild(newElement5);

    //display:none解除
    var hidden = document.getElementById('hidden2');
    hidden.classList.add("display");
}

// 関数の計算
var cul = function (x, z) { //x→配列, y→xの値
    var ans = 0;
    x.forEach(function (element, index) {
        if (index == 0) {
            ans += parseFloat(element);
        } else {
            ans += parseFloat(element * (Math.pow(z, index)));
        }
    });
    return ans;
};

// 導関数f'(x)
var df = function (x) { //x→配列, y→xの値
    x.forEach(function (element, index) {
        if (index != 0) {
            df_coefficient[index - 1] = element * index;
        }
    });
    return df_coefficient;
};

// ニュートン法
var newtonMethod = function (a, eps, f_array, df_array) {
    var i = 0;
    while (i < 1000) {
        i++;
        // 漸化式
        ah = a - (cul(f_array, a) / cul(df_array, a));
        // 収束条件(近似解の変化が十分小さい)を満たせば計算終了
        if (Math.abs(ah - a) < eps) break;
        //　近似解の更新
        a = ah;
    }
    return a;

};