# My Exotic Fruit

Currently hosted on EKM.
In future, we plan to switch to being a static website with a custom build pipeline for shared components, generated content, SEO, and other reusable functionality.
I'm not a huge fan of [EKM's dev docs](https://tags.ekm.com) but they aren't BAD by any means.
Worse is that I don't particularly like how their custom elements look, and their tags are messy imo.

## Categories

```mermaid
flowchart TB

    subgraph Shop["Shop Online"]
        direction LR

        subgraph Flavours
            direction TB
            Sweet
            Sour
            Savoury
            Bitter
            Ingredients
        end

        subgraph Popular["Popular Now"]
            direction TB
            Favourites
            SelectionBoxes["Selection boxes"]
            VarietyBoxes["Variety boxes"]
            Asian["Asian favourites"]
            Caribbean["Caribbean favourites"]
            Seasonal
            Soursop
        end

        subgraph Special["Special Produce"]
            direction TB
            Luxury["Luxury fruits"]
            Gifts
            Unique["Unique fruits"]
            Miscellaneous
        end

        subgraph Varieties
            direction TB
            Mangoes
            DragonFruits["Dragon fruits"]
            Passion-Fruits["Passion fruits"]
            Citrus
            Guavas
            Dates
            Bananas
            Pineapples
            Melons
            Coconuts
            Apples-pears["Apples & pears"]
            Potatoes
            Grapes
            Durians["Durians & jackfruits"]
            Soursop
        end

        subgraph Wholesome
            direction TB
            Alkaline["Alkaline & seeded"]
            Organic["Organic & unwaxed"]
            Antioxidant-rich
            Superfruits
            Healthy-side-effects["Healthy side-effects"]
            Soursop
        end
    end
```

## Project
This project relies on a custom [build pipeline](./BUILD-PIPELINE.md)!
Build with 
```bash
node build.js
```

and deploy from the created `build` folder.