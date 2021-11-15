#include <iostream>
#include <cmath>
#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include "vendor/entt/entt.hpp"
#include "main.h"
#include "scene/Scene.cpp"

EMSCRIPTEN_KEEPALIVE
int add(int a, int b) {
    return a + b;
}
EMSCRIPTEN_KEEPALIVE
int sub(int a, int b) {
    return a - b;
}
EMSCRIPTEN_KEEPALIVE
int mul(int a, int b) {
    return a * b;
}
EMSCRIPTEN_KEEPALIVE
int divi(int a, int b) {
    return a / b;
}
EMSCRIPTEN_KEEPALIVE
int mod(int a, int b) {
    return a % b;
}

struct Player {
    float xpos;
    float ypos;
    
    void moveUp() {
        ypos--;
    }
    void moveDown() {
        ypos++;
    }

    void moveLeft() {
        xpos--;
    }
    void moveRight() {
        xpos++;
    }
    // move up right
    void moveUpRight() {
        xpos++;
        ypos--;
    }
    // move up left
    void moveUpLeft() {
        xpos--;
        ypos--;
    }
    // move down right
    void moveDownRight() {
        xpos++;
        ypos++;
    }
    // move down left
    void moveDownLeft() {
        xpos--;
        ypos++;
    }
};

enum class Move{
    STATIONARY = 0,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    UP_RIGHT,
    UP_LEFT,
    DOWN_RIGHT,
    DOWN_LEFT
};

struct GameState {
    Player player{100, 100};
    Move move = Move::STATIONARY;
};

struct Vector2 {
    float x;
    float y;
};
//generate middle point between two vectors
Vector2 middlePoint(Vector2 a, Vector2 b) {
    Vector2 result;
    result.x = (a.x + b.x) / 2;
    result.y = (a.y + b.y) / 2;
    return result;
}

//generate distance between two vectors
float distance(Vector2 a, Vector2 b) {
    float x = a.x - b.x;
    float y = a.y - b.y;
    return sqrt(x * x + y * y);
}

GameState createInitialGameState(){
    DrawMe(600, 800, 10, 10);
    return GameState{};
}

GameState updatePosition(GameState gameState) {
    if (gameState.move == Move::UP) {
        gameState.player.moveUp();
    }
    if (gameState.move == Move::DOWN) {
        gameState.player.moveDown();
    }
    if (gameState.move == Move::LEFT) {
        gameState.player.moveLeft();
    }
    if (gameState.move == Move::RIGHT) {
        gameState.player.moveRight();
    }
    if (gameState.move == Move::UP_RIGHT) {
        gameState.player.moveUpRight();
    }
    if (gameState.move == Move::UP_LEFT) {
        gameState.player.moveUpLeft();
    }
    if (gameState.move == Move::DOWN_RIGHT) {
        gameState.player.moveDownRight();
    }
    if (gameState.move == Move::DOWN_LEFT) {
        gameState.player.moveDownLeft();
    }
    return gameState;
}

int main() {
    Scene scene;
    std::cout << "Scene is here: Player: "<< scene.player.Transform.x << " - " << scene.player.Transform.y <<std::endl;

    printMeSoldo(1000, false, 2.0f);
    CallMe(true);
    // EM_ASM(Loaded());
    Stringolo(65);
    
    return 0;
}

EMSCRIPTEN_BINDINGS(gameState) {

    emscripten::value_object<Player>("Player")
        .field("xpos", &Player::xpos)
        .field("ypos", &Player::ypos)
        ;

    emscripten::enum_<Move>("Move")
        .value("STATIONARY", Move::STATIONARY)
        .value("UP", Move::UP)
        .value("DOWN", Move::DOWN)
        .value("LEFT", Move::LEFT)
        .value("RIGHT", Move::RIGHT)
        .value("UP_RIGHT", Move::UP_RIGHT)
        .value("UP_LEFT", Move::UP_LEFT)
        .value("DOWN_RIGHT", Move::DOWN_RIGHT)
        .value("DOWN_LEFT", Move::DOWN_LEFT);


    emscripten::value_object<GameState>("GameState")
        .field("player", &GameState::player)
        .field("move", &GameState::move);
        

    emscripten::value_object<Vector2>("Vector2")
        .field("x", &Vector2::x)
        .field("y", &Vector2::y);

    emscripten::function("distance", &distance);    
    emscripten::function("middlePoint", &middlePoint);    
    emscripten::function("updatePosition", &updatePosition);
    emscripten::function("createInitialGameState", &createInitialGameState);
}
