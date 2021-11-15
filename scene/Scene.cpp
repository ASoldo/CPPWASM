#include "Scene.h"

Scene::Scene()
{
    entt::entity entity = registry.create();
    registry.emplace<TransfromComponent>(entity, TransfromComponent(XY{250, 250}));
    
    auto& transform = registry.get<TransfromComponent>(entity);
    // TransfromComponent loca = registry.get<TransfromComponent>(entity);

    player = transform;
}

Scene::~Scene()
{

}