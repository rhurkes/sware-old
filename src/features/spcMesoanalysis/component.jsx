import React from 'react';
import Card from '../../components/card';

// TODO image placeholder http://stackoverflow.com/questions/8987428/image-placeholder

const defaultParameter = { id: 'TTD', label: 'Temp/Wind/Dwpt' };

class SPCMesoanalysis extends React.Component {
  constructor() {
    super();
    this.state = {
      parametersDrawerOpen: false,
    };
  }

  toggleParametersDrawer(override) {
    const newDrawerState = (typeof override !== 'undefined')
      ? override
      : !this.state.parametersDrawerOpen;
    this.setState({ parametersDrawerOpen: newDrawerState });
  }

  render() {
    const {
      parameter, recentParameters, sector, updateParameter, updateSector, updateRefresh,
    } = this.props;

    let parametersLabel = 'Parameters >';
    let parametersClass = 'open';

    if (!this.state.parametersDrawerOpen) {
      parametersLabel = '< Parameters';
      parametersClass = 'closed';
    }

    // TODO have separate mapping file for these
    const allParameters = [
      <li><button className="observations" onClick={() => updateParameter('BIGSFC', 'Surface Observations')}>BIGSFC</button></li>,
      <li><button className="observations" onClick={() => updateParameter('1KMV', 'Visible Satellite')}>1KMV</button></li>,
      <li><button className="observations" onClick={() => updateParameter('RGNLRAD', 'Radar Base Reflectivity')}>RGNLRAD</button></li>,
      <li><button className="surface" onClick={() => updateParameter('PMSL', 'MSL Pressure/Wind')}>PMSL</button></li>,
      <li><button className="surface" onClick={() => updateParameter('TTD', 'Temp/Wind/Dwpt')}>TTD</button></li>,
      <li><button className="surface" onClick={() => updateParameter('MCON', 'Moisture Convergence')}>MCON</button></li>,
      <li><button className="surface" onClick={() => updateParameter('THEA', 'Theta-E Advection')}>THEA</button></li>,
      <li><button className="surface" onClick={() => updateParameter('MXTH', 'Mixing Ratio / Theta')}>MXTH</button></li>,
      <li><button className="surface" onClick={() => updateParameter('ICON', 'Instantaneous Contraction Rate (sfc)')}>ICON</button></li>,
      <li><button className="surface" onClick={() => updateParameter('TRAP', 'Fluid Trapping (sfc)')}>TRAP</button></li>,
      <li><button className="surface" onClick={() => updateParameter('VTM', 'Velocity Tensor Magnitude (sfc)')}>VTM</button></li>,
      <li><button className="surface" onClick={() => updateParameter('DVVR', 'Divergence and Vorticity (sfc)')}>DVVR</button></li>,
      <li><button className="surface" onClick={() => updateParameter('DEF', 'Deformation and Axes of Dilitation (sfc)')}>DEF</button></li>,
      <li><button className="surface" onClick={() => updateParameter('PCHG', '2-hour Pressure Change')}>PCHG</button></li>,
      <li><button className="surface" onClick={() => updateParameter('TEMP_CHG', '3-hour Temp Change')}>TEMPCHG</button></li>,
      <li><button className="surface" onClick={() => updateParameter('DWPT_CHG', '3-hour Dwpt Change')}>DWPTCHG</button></li>,
      <li><button className="surface" onClick={() => updateParameter('MIXR_CHG', '3-hour 100mb Mixing Ratio Change')}>MIXRCHG</button></li>,
      <li><button className="surface" onClick={() => updateParameter('THTE_CHG', '3-hour Theta-E Change')}>THTECHG</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('925MB', '925mb Analysis')}>925MB</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('850MB', '850mb Analysis')}>850MB</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('700MB', '700mb Analysis')}>700MB</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('500MB', '500mb Analysis')}>500MB</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('300MB', '300mb Analysis')}>300MB</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('DLCP', 'Deep Moist Convergence')}>DLCP</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('SFNT', 'Sfc Frontogenesis')}>SFNT</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('TADV', '850mb Temp Advection')}>TADV</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('7TAD', '700mb Temp Advection')}>7TAD</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('9FNT', '925mb Frontogenesis')}>9FNT</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('8FNT', '850mb Frontogenesis')}>8FNT</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('7FNT', '700mb Frontogenesis')}>7FNT</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('925F', '1000-925mb Frontogenesis')}>925F</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('98FT', '925-850mb Frontogenesis')}>98FT</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('857F', '850-700mb Frontogenesis')}>857F</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('75FT', '700-500mb Frontogenesis')}>75FT</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('VADV', '700-400mb Diff. Vorticity Advection')}>VADV</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('PADV', '400-250mb Pot. Vorticity Advection')}>PADV</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('DDIV', '850-250mb Diff. Divergence')}>DDIV</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('AGEO', '300mb Jet Circulation')}>AGEO</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('500MB_CHG', '12-hour 500mb Height Change')}>500MBCHG</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('TRAP500', 'Fluid Trapping (500mb)')}>TRAP500</button></li>,
      <li><button className="upper-air" onClick={() => updateParameter('TRAP250', 'Fluid Trapping (250mb)')}>TRAP250</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('SBCP', 'CAPE - Surface-Based')}>SBCP</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('MLCP', 'CAPE - 100mb Mixed-Layer')}>MLCP</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('MUCP', 'CAPE - Most-Unstable / LPL Height')}>MUCP</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('NCAP', 'CAPE - Normalized')}>NCAP</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('DCAPE', 'CAPE - Downdraft')}>DCAPE</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('MULI', 'Surface-based Lifted Index')}>MULI</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('LAPS', 'Mid-Level Lapse Rates')}>LAPS</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('LLLR', 'Low-Level Lapse Rates')}>LLLR</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('LCLH', 'LCL Height')}>LCLH</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('LFCH', 'LFC Height')}>LFCH</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('LFRH', 'LCL-LFC Mean RH')}>LFRH</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('SBCP_CHG', '3-hour Surface-Based CAPE Change')}>SBCPCHG</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('SBCN_CHG', '3-hour Surface-Based CIN Change')}>SBCNCHG</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('MLCP_CHG', '3-hour 100mb Mixed-Layer CAPE Change')}>MLCPCHG</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('MUCP_CHG', '3-hour Most-Unstable CAPE Change')}>MUCPCHG</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('LLLR_CHG', '3-hour Low-Level LR Change')}>LLLRCHG</button></li>,
      <li><button className="thermodynamics" onClick={() => updateParameter('LAPS_CHG', '6-hour Mid-Level LR Change')}>LAPSCHG</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('ESHR', 'Bulk Shear - Effective')}>ESHR</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('SHR6', 'Bulk Shear - Sfc-6km')}>SHR6</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('SHR8', 'Bulk Shear - Sfc-8km')}>SHR8</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('SHR1', 'Bulk Shear - Sfc-1km')}>SHR1</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('BRNS', 'BRN Shear')}>BRNS</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('EFFH', 'SR Helicity - Effective')}>EFFH</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('SRH3', 'SR Helicity - Sfc-3km')}>SRH3</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('SRH1', 'SR Helicity - Sfc-1km')}>SRH1</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('LLSR', 'SR Wind - Sfc-2km')}>LLSR</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('MLSR', 'SR Wind - 4-6km')}>MLSR</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('ULSR', 'SR Wind - 9-11km')}>ULSR</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('ALSR', 'SR Wind - Anvil Level')}>ALSR</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('MNWD', '850-300mb Mean Wind')}>MNWD</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('XOVER', '850 and 500mb Winds')}>XOVER</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('SRH3_CHG', '3hr Sfc-3km SR Helicity Change')}>SRH3CHG</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('SHR1_CHG', '3hr Sfc-1km Bulk Shear Change')}>SHR1CHG</button></li>,
      <li><button className="wind-shear" onClick={() => updateParameter('SHR6_CHG', '3hr Sfc-6km Bulk Shear Change')}>SHR6CHG</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('SCP', 'Supercell Composite')}>SCP</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('LSCP', 'Supercell Composite (left-moving)')}>LSCP</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('STOR', 'Sgfnt Tornado (fixed layer)')}>STOR</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('STPC', 'Sgfnt Tornado (effective layer)')}>STPC</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('SIGT1', 'Cond. Prob. Sigtor (Eqn 1)')}>SIGT1</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('SIGT2', 'Cond. Prob. Sigtor (Eqn 2)')}>SIGT2</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('NSTP', 'Non-Supercell Tornado')}>NSTP</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('SIGH', 'Sgfnt Hail')}>SIGH</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('SARS1', '*New*  SARS Hail Size')}>SARS1</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('SARS2', '*New*  SARS Sig. Hail Percentage')}>SARS2</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('LGHL', '*New*  Large Hail Parameter')}>LGHL</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('DCP', 'Derecho Composite')}>DCP</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('CBSIG', 'Craven/Brooks Sgfnt Severe')}>CBSIG</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('BRN', 'Bulk Richardson Number')}>BRN</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('MCSM', 'MCS Maintenance')}>MCSM</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('MBCP', 'Microburst Composite ')}>MBCP</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('EHI1', 'EHI - Sfc-1km')}>EHI1</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('EHI3', 'EHI - Sfc-3km')}>EHI3</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('VGP3', 'VGP - Sfc-3km')}>VGP3</button></li>,
      <li><button className="composite-indices" onClick={() => updateParameter('CRIT', '*New*  Critical Angle')}>CRIT</button></li>,
      <li><button className="multi-parameter-fields" onClick={() => updateParameter('CPSH', 'Most-Unstable CAPE / Effective Bulk Shear')}>CPSH</button></li>,
      <li><button className="multi-parameter-fields" onClick={() => updateParameter('COMP', 'Most-Unstable LI / 850 & 500mb Winds')}>COMP</button></li>,
      <li><button className="multi-parameter-fields" onClick={() => updateParameter('LCLS', 'LCL Height / Sfc-1km SR Helicity')}>LCLS</button></li>,
      <li><button className="multi-parameter-fields" onClick={() => updateParameter('LR3C', 'Sfc-3km Lapse Rate / Sfc-3km MLCAPE')}>LR3C</button></li>,
      <li><button className="multi-parameter-fields" onClick={() => updateParameter('3CVR', 'Sfc Vorticity / Sfc-3km MLCAPE')}>3CVR</button></li>,
      <li><button className="multi-parameter-fields" onClick={() => updateParameter('TDLR', 'Sfc Dwpt / 700-500mb Lapse Rates')}>TDLR</button></li>,
      <li><button className="multi-parameter-fields" onClick={() => updateParameter('HAIL', 'Hail Parameters')}>HAIL</button></li>,
      <li><button className="multi-parameter-fields" onClick={() => updateParameter('QLCS1', 'Lowest 3km max. Theta-e diff., MUCAPE, and 0-3km vector shear')}>QLCS1</button></li>,
      <li><button className="multi-parameter-fields" onClick={() => updateParameter('QLCS2', 'Lowest 3km max. Theta-e diff., MLCAPE, and 0-3km vector shear')}>QLCS2</button></li>,
      <li><button className="heavy-rain" onClick={() => updateParameter('PWTR', 'Precipitable Water')}>PWTR</button></li>,
      <li><button className="heavy-rain" onClick={() => updateParameter('TRAN', '850mb Moisture Transport')}>TRAN</button></li>,
      <li><button className="heavy-rain" onClick={() => updateParameter('PROP', 'Upwind Propagation Vector')}>PROP</button></li>,
      <li><button className="heavy-rain" onClick={() => updateParameter('PEFF', 'Precipitation Potential Placement')}>PEFF</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('PTYP', 'Precipitation Type')}>PTYP</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('FZTP', 'Near-Freezing Surface Temp')}>FZTP</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('SWBT', 'Surface Wet-Bulb Temp')}>SWBT</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('FZLV', 'Freezing Level')}>FZLV</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('THCK', 'Critical Thicknesses')}>THCK</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('EPVL', '800-750mb EPVg')}>EPVL</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('EPVM', '650-500mb EPVg')}>EPVM</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('LES1', 'Lake Effect Snow 1')}>LES1</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('LES2', 'Lake Effect Snow 2')}>LES2</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('SNSQ', 'Snow Squall Parameter')}>SNSQ</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('DEND', '*New*  Dendritic Growth Layer Depth')}>DEND</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('DENDRH', '*New*  Dendritic Growth Layer RH')}>DENDRH</button></li>,
      <li><button className="winter-weather" onClick={() => updateParameter('MXWB', '*New*  Max Wet Bulb Temperature')}>MXWB</button></li>,
      <li><button className="fire-weather" onClick={() => updateParameter('SFIR', 'Sfc RH / Temp / Wind')}>SFIR</button></li>,
      <li><button className="fire-weather" onClick={() => updateParameter('FOSB', 'Fosberg Index')}>FOSB</button></li>,
      <li><button className="fire-weather" onClick={() => updateParameter('LHAN', 'Low Altitude Haines Index')}>LHAN</button></li>,
      <li><button className="fire-weather" onClick={() => updateParameter('MHAN', 'Mid Altitude Haines Index')}>MHAN</button></li>,
      <li><button className="fire-weather" onClick={() => updateParameter('HHAN', 'High Altitude Haines Index')}>HHAN</button></li>,
      <li><button className="fire-weather" onClick={() => updateParameter('LASI', 'Lower Atmospheric Severity Index')}>LASI</button></li>,
      <li><button className="classic" onClick={() => updateParameter('TTOT', 'Total Totals')}>TTOT</button></li>,
      <li><button className="classic" onClick={() => updateParameter('KIDX', 'K-Index')}>KIDX</button></li>,
      <li><button className="classic" onClick={() => updateParameter('SHOW', 'Showalter Index')}>SHOW</button></li>,
      <li><button className="beta" onClick={() => updateParameter('SHERBE', '*New* SHERBE')}>SHERBE</button></li>,
      <li><button className="beta" onClick={() => updateParameter('CWASP', '*New* CWASP')}>CWASP</button></li>,
      <li><button className="beta" onClick={() => updateParameter('OPRH', '*New* OPRH')}>OPRH</button></li>,
      <li><button className="beta" onClick={() => updateParameter('PTSTPE', '*New* Prob EF0+ (conditional on RM supercell) ')}>PTSTPE</button></li>,
      <li><button className="beta" onClick={() => updateParameter('PSTPE', '*New* Prob EF2+ (conditional on RM supercell)')}>PSTPE</button></li>,
      <li><button className="beta" onClick={() => updateParameter('PVSTPE', '*New* Prob EF4+ (conditional on RM supercell)')}>PVSTPE</button></li>,
    ];

    const recentParameterButtons = recentParameters.map((param, index) =>
      <li key={index}>
        <button onClick={() => updateParameter(param.id, param.label)}>{param.id}</button>
      </li>,
    );

    // TODO ignore jsx a11y rule for img click
    

    return (
      <div className="page spc-mesoanalysis">
        <div className="display">
          <img src={testURL} alt={parameter} onClick={() => this.toggleParametersDrawer(false)} />
          {/* <Card title="Significant Tornado (Effective Layer)">
            <span>A multiple ingredient, composite index that includes effective bulk wind difference (EBWD), effective storm-relative helicity (ESRH), 100-mb mean parcel CAPE (mlCAPE), 100-mb mean parcel CIN (mlCIN), and 100-mb mean parcel LCL height (mlLCL). A majority of significant tornadoes (F2 or greater damage) have been associated with STP values greater than 1 within an hour of tornado occurrence, while most non-tornadic supercells have been associated with values less than 1 in a large sample of RAP analysis proximity soundings. </span>
          </Card>*/}
        </div>
        <div className="menu">
          <div className="config">
            <Card title="Controls" className="controls">
              <ol>
                <li>Refresh</li>
                <li><button className="large" onClick={() => updateRefresh(1)}>1m</button></li>
                <li><button className="large" onClick={() => updateRefresh(5)}>5m</button></li>
                <li><button onClick={() => updateRefresh(0)}>Off</button></li>
              </ol>
              <ol>
                <li>Recent</li>
                {recentParameterButtons}
              </ol>
              <ol>
                <li>Observed</li>
                <li><button className="large" onClick={() => null}>-4H</button></li>
                <li><button className="large" onClick={() => null}>-2H</button></li>
                <li><button onClick={() => null}>Now</button></li>
              </ol>
              <ol>
                <li>Forecast</li>
                <li><button onClick={() => null}>Now</button></li>
                <li><button className="large" onClick={() => null}>+2H</button></li>
                <li><button className="large" onClick={() => null}>+4H</button></li>
              </ol>
            </Card>
            <Card title="Sectors">
              <ol className="sectors">
                <li><button onClick={() => updateSector(11)}>NW</button></li>
                <li><button onClick={() => updateSector(12)}>SW</button></li>
                <li><button onClick={() => updateSector(13)}>NC</button></li>
                <li><button onClick={() => updateSector(14)}>C</button></li>
                <li><button onClick={() => updateSector(15)}>SC</button></li>
                <li><button onClick={() => updateSector(16)}>NE</button></li>
                <li><button onClick={() => updateSector(17)}>EC</button></li>
                <li><button onClick={() => updateSector(18)}>SE</button></li>
                <li><button onClick={() => updateSector(20)}>MW</button></li>
                <li><button onClick={() => updateSector(19)}>NATL</button></li>
              </ol>
            </Card>
            <Card title="Overlays">
              <ol className="overlays">
                <li><button onClick={() => null}>Ctys</button></li>
                <li><button onClick={() => null}>CWAs</button></li>
                <li><button onClick={() => null}>Hiways</button></li>
                <li><button onClick={() => null}>ARTCC</button></li>
                <li><button onClick={() => null}>Watches & Warnings</button></li>
                <li><button onClick={() => null}>Otlk</button></li>
              </ol>
            </Card>
            <Card title="Underlay">
              <ol className="underlays">
                <li><button onClick={() => null}>None</button></li>
                <li><button onClick={() => null}>Radar</button></li>
                <li><button onClick={() => null}>Terr</button></li>
                <li><button onClick={() => null}>Pop</button></li>
                <li><button onClick={() => null}>Sfc Obs</button></li>
              </ol>
            </Card>
          </div>
        </div>
        <div className="parameters">
          <Card
            title={parametersLabel}
            className={parametersClass}
            tabFunction={() => this.toggleParametersDrawer()}
          >
            <ol>
              {allParameters}
            </ol>
          </Card>
        </div>
      </div>
    );
  }
}

export default SPCMesoanalysis;
