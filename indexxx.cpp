#include <iostream>
using namespace std;

#define SOLDO 100
//macro
#define LOG(x) cout << x << endl

#define var false

int main(){

#if var
    //array of characters
    LOG("char array");
#endif
    char name[20];
    cout << "Enter your name: ";
    cin >> name;
    cout << "Size of char: " << sizeof(char) << endl;
    cout << "Hello " << name << endl;
    cout << SOLDO << endl;
    // cout << "Hello World!" << endl;
    return 0;
}