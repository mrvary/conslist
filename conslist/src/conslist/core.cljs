(ns conslist.core
    (:require [reagent.core :as reagent :refer [atom]]))

(enable-console-print!)

(println "This text is printed from src/conslist/core.cljs. Go ahead and edit it and see reloading in action.")

;; define your app data so that it doesn't get over-written on reload

(defonce app-state (atom {:text "Hello world!"}))

(defn header []
  [:header
   [:h1 "cons cons cons"]])

(defn main []
  [:main
   [:div#left
    [:p.bold "Oh hi,"]
    [:p
     "this little site helps you test your hierarchical structure skills."
     [:br]
     "Enter valid scheme code below. Use the "
     [:b "cons"]
     " and "
     [:b "list"]
     " functions."]
    [:form
     [:textarea#code
      {:placeholder "Enter something like (cons 1 2) ...",
       :type "text"}]
     [:button#btn {:type "button"} "Draw it!"]]]
   [:div#right]])

(defn footer []
  [:footer
   [:p
    "Read up on this topic "
    [:a
     {:href
      "https://sarabander.github.io/sicp/html/2_002e2.xhtml#g_t2_002e2"}
     "here..."]]])


(defn app []
  [:div
   [header]
   [main]
   [footer]])

(reagent/render-component [app]
                          (. js/document (getElementById "app")))

(defn on-js-reload [])
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
