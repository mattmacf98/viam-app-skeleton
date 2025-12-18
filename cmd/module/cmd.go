package main

import (
	"go.viam.com/rdk/components/generic"
	"go.viam.com/rdk/module"
	"go.viam.com/rdk/resource"

	viamappskeleton "github.com/mattmacf98/viam-app-skeleton"
)

func main() {
	module.ModularMain(
		resource.APIModel{generic.API, viamappskeleton.Model},
	)

}
