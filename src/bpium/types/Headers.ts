export namespace Headers {
	export interface Report {
		DATE?,
		SC?,
		BOOKINGNO?,
		NUMBEROFCONTAINER?,
		TYPE?,
		GROSSWEIGHT?,
		SHIPPER?,
		VESSEL?,
		ETD?,
		POL?,
		SOCCOC?,
		FREIGHTTERM?,
		row?
	}

	export interface ManifestBooking {
		BLNO?,
		PKGS?,
		PACKAGETYPE?,
		GWEIGHT?,
		GOODS?,
		SHIPPER?,
		CONSIGNEE?,
		NOTIFYPARTY?,
		MARK?,
		row?
	}

	export interface ManifestContainer {
		MENSION?,
		TYPE?,
		VOLUME?,
		CONTAINERNO?,
		SEAL?,
		PKGS_2?,
		GWEIGHT_2?,
		CONTAINERTAREWEIGHT?,
		CBM?,
		FREIGHT?,
		CONTAINEROWNER?,
		REMARK?,
		row?
	}

	export type Manifest = ManifestBooking & ManifestContainer

}


