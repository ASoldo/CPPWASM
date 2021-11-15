#pragma once
#include "../vendor/entt/entt.hpp"

struct XY {
    float x;
    float y;
};

//Component class
struct TransfromComponent {
    XY Transform;
    TransfromComponent() = default;
    TransfromComponent(const TransfromComponent&) = default;
    TransfromComponent(const XY& transform) : Transform(transform) {}

    //implicit cast operator, return Transform
    operator  XY&() { return Transform; }
    operator const XY&() const { return Transform; }
};

class Scene
{
public:
    Scene();
    ~Scene();
    TransfromComponent player;

private:
    entt::registry registry;

};