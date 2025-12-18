package main

import (
	"go.viam.com/rdk/components/generic"
	"go.viam.com/rdk/module"
	"go.viam.com/rdk/resource"
)

func main() {
	module.ModularMain(
		resource.APIModel{generic.API, Model},
	)

}

var Model = resource.ModelNamespace("mattmacf").WithFamily("viam-app-skeleton").WithModel("viam-app-skeleton")

func init() {
	resource.RegisterComponent(
		generic.API,
		Model,
		resource.Registration[resource.Resource, resource.NoNativeConfig]{})
}
