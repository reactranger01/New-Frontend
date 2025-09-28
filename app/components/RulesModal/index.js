import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PropTypes } from 'prop-types';
import { reactIcons } from '@/utils/icons';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 640,
  width: '100%',
  bgColor: '#ffffff',
  //   bgcolor: '#1E8067',
  // border: '2px solid #000',
  // boxShadow: 24,
  outline: 'none',
  p: 0,
  borderRadius: '10px',
  //   overflowY: 'auto',
  //   height: '99vh',
};

export default function RulesModal({ isOpen, handleClose }) {
  return (
    <div className="">
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundColor: '#8f8f8f',
        }}
      >
        <Box sx={style}>
          <div className="bg-white h-[98vh] overflow-y-auto hide-scrollbar">
            <div className="flex items-center justify-between bg-[#1E8067] p-2">
              <h1 className="  text-18  text-white">Rules</h1>
              <button
                onClick={handleClose}
                className=" z-20 text-white font-bold text-2xl cursor-pointer "
              >
                {reactIcons.close}
              </button>
            </div>
            <div className="py-[10px] px-2 text1-14">
              <h4 className="text-14 mb-2">PART B - GENERAL RULES</h4>
              {/* div 1 */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">
                  1. Matters beyond the Site&apos;s reasonable control and
                  malfunctions
                </h5>
                <ul className="text-14">
                  <li>
                    • The Site is not liable for any loss or damage you may
                    suffer because of any: act of God; power cut; trade or
                    labour dispute; act, failure or omission of any government
                    or authority; obstruction or failure of telecommunication
                    services; or any other delay or failure caused by a third
                    party or otherwise outside of our control. In such an event,
                    the Site reserves the right to cancel or suspend access to
                    the Site without incurring any liability.
                  </li>
                  <li>
                    The Site is not liable for the failure of any equipment or
                    software howsoever caused, wherever located or administered,
                    or whether under its direct control or not, that may prevent
                    the operation of the Site.{' '}
                  </li>
                  <li>
                    • In the event of a technological failure or error which is
                    apparent to the customer, the customer is obliged to notify
                    the Site of such failure/error immediately. If the customer
                    continues to place a bet in these circumstances, they shall
                    take reasonable action to minimise any potential loss. In
                    the absence of such action, the Site reserves the right to
                    void a bet.{' '}
                  </li>
                  <li>
                    • The Site reserves the right in its absolute discretion to
                    restrict access to the Site, or withhold funds or void any
                    bets outstanding to a customer’s account in its absolute
                    discretion in the event of a technological failure or other
                    malfunction which affects the integrity of the Site whether
                    this is under its direct control or otherwise. Customers
                    will be notified on the Site of any such malfunction which
                    may operate to prevent the placing of further bets or which
                    may result in outstanding bets being voided.
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h5 className="text-14 mb-2">
                  2. Managing markets In-Play <br />
                </h5>
                General <br />
                For everything other than horseracing and greyhound racing, if a
                market is not scheduled to be turned in-play but the Site fails
                to suspend the market at the relevant time, then:
                <ul className="text-14">
                  <li>
                    • if the event has a scheduled off &apos; time, all bets
                    matched after that scheduled off time will be void; and
                  </li>
                  <li>
                    • if the event does not have a scheduled &apos;off&apos;
                    time, the Site will use its reasonable endeavours to
                    ascertain the time of the actual &apos;off&apos; and all
                    bets after the time of the &apos;off&apos; determined by the
                    Site will be void.
                  </li>
                  <li>
                    • For horseracing and greyhound racing, if a market is not
                    scheduled to be turned in-play but the Site fails to suspend
                    the market at the relevant time, then all bets matched after
                    the official &apos;off&apos; time will be void.
                  </li>
                  <li>
                    • The Site aims to use its reasonable endeavours to suspend
                    in-play markets at the start of and at the end of the event.
                    However, the Site does not guarantee that such markets will
                    be suspended at the relevant time.
                  </li>
                  <li>
                    • Customers are responsible for managing their in-play bets
                    at all times.
                  </li>
                  <li>
                    • For the purposes of in-play betting, customers should be
                    aware that transmissions described as &quot;live&quot; by
                    some broadcasters may actually be delayed or pre-recorded.
                    The extent of any delay may vary depending on the set-up
                    through which they are receiving pictures or data. <br />{' '}
                    All markets other than soccer markets - not suspending at
                    the time of the &apos;off&apos;
                  </li>
                  <li>
                    • In relation to markets which are scheduled to be turned
                    in-play, the Site aims to use its reasonable endeavours to
                    turn such markets in-play at the time of the
                    &apos;off&apos;. However, the Site does not guarantee that
                    such markets will be suspended and turned in-play at the
                    time of the &apos;off&apos;.
                  </li>
                  <li>
                    • If a market is scheduled to be turned in-play but the Site
                    does not suspend the market and cancel unmatched bets at the
                    time of the &apos;off&apos; and the market is not turned
                    in-play with unmatched bets cancelled at any time during the
                    event, all bets matched after the scheduled time of the
                    &apos;off&apos; will be void (in the case of horseracing and
                    greyhound racing, bets will be void from the official rather
                    than the scheduled &apos;off&apos; time). If the event does
                    not have a scheduled &apos;off&apos; time, the Site will use
                    its reasonable endeavours to ascertain the time of the
                    actual &apos;off&apos; and all bets after the time of the
                    &apos;off&apos; determined by the Site will be void.
                  </li>
                  <li>
                    • If a market is scheduled to be turned in-play but the Site
                    does not suspend the market at the time of the
                    &apos;off&apos; (so unmatched bets are not cancelled at that
                    time), but the market is intentionally turned in-play at a
                    later time during the event, all bets matched after the time
                    of the &apos;off&apos; will stand.
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h5 className="text-14 mb-2">
                  3. Soccer markets - not suspending at kick-off or on the
                  occurrence of a Material Event and rules relating to VAR
                  <br />
                  Not suspending at kick-off
                </h5>
                <ul className="text-14">
                  <li>
                    • In relation to soccer markets that are scheduled to be
                    turned in-play, the Site aims to use its reasonable
                    endeavours to turn such markets in-play at kick-off and to
                    suspend such markets on the occurrence of a Material Event
                    (see definition of &quot;Material Event&quot; below).
                  </li>
                  <li>
                    • The Site does not guarantee that such markets will be
                    suspended and turned in-play at kick-off.{' '}
                  </li>
                  <li>
                    {' '}
                    • If a market is scheduled to be turned in-play but the Site
                    does not suspend the market at kick-off and the market is
                    not turned in-play at any time during the match, all bets
                    matched after the scheduled time of the kick-off will be
                    void.{' '}
                  </li>
                  <li>
                    {' '}
                    • If a market is scheduled to be turned in-play but the Site
                    does not suspend the market at kick-off (so unmatched bets
                    are not cancelled at that time), but the market is turned
                    in-play at a later time during the match, all bets matched
                    after the scheduled time of the kick-off and before the
                    first &quot;Material Event&quot; will stand. However, if
                    there has been one or more &quot;Material Events&quot;, any
                    bets matched between the first &quot;Material Event&quot;
                    and the market being turned in-play will be void.{' '}
                  </li>
                  <li>
                    • Not suspending on the occurrence of a Material Event and
                    cancellations of Material Events due to VAR{' '}
                  </li>
                  <li>
                    • If the Site does not suspend a market on time for the
                    occurrence of a Material Event, the Site reserves the right
                    to void bets unfairly matched after the Material Event has
                    occurred. Voiding of these bets may take place during the
                    event or retrospectively once a game is completed.{' '}
                  </li>
                  <li>
                    • Where a Material Event is cancelled due to a determination
                    made via a video assistant referee, the Site will void all
                    bets which are matched between the occurrence of the
                    Material Event and the cancellation of it. The voiding of
                    any such bets may take place during the event or
                    retrospectively once a game is completed. Definition of
                    &quot;Material Event&quot;
                    <br /> For the purpose of these Rules, a &quot;Material
                    Event&quot; shall mean a goal being scored, a penalty being
                    awarded or a player being sent off.
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h5 className="text-14 mb-2">
                  4. Results and market settlement
                  <br />
                  General
                </h5>
                <ul className="text-14">
                  <li>
                    • Markets will be settled in accordance as set out in the
                    Specific Sports Rules.
                  </li>
                  <li>
                    • Where the Specific Sports Rules do not specify how and on
                    what basis a market will be settled, markets will be settled
                    on the official result of the relevant governing body
                    regardless of any subsequent disqualification or amendment
                    to the result (except if an amendment is announced within 24
                    hours of the initial settlement of the relevant market in
                    order to correct an error in reporting the result).
                  </li>
                  <li>
                    • If no official result of a relevant governing body is
                    available, the result will be determined by the Site (acting
                    reasonably) using information from independent sources. In
                    such cases, if any new information comes into the public
                    domain within 48 hours of settlement, then the Site shall
                    (acting reasonably) determine either: (i) whether the market
                    should be reinstated or resettled in light of this new
                    information; or (ii) whether or not to wait for further
                    information before deciding whether to reinstate or resettle
                    the market. Except where the Site has announced that it is
                    waiting for further information, any information that comes
                    into the public domain more than 48 hours after a market has
                    been settled shall not be considered by the Site (regardless
                    of whether or not such information may have led to a
                    different result).
                  </li>
                  <li>
                    • In the event of any uncertainty about any result or
                    potential result, the Site reserves the right to suspend
                    settlement of any market for an unlimited period until the
                    uncertainty can be resolved to the reasonable satisfaction
                    of the Site. The Site reserves the right to void any market
                    if the uncertainty regarding settlement cannot be resolved
                    to the Site&apos;s reasonable satisfaction.
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h5 className="text-14 mb-2">5. Resettlements</h5>
                <ul className="text-14">
                  <li>
                    • Markets are generally settled shortly after the end of the
                    event in question. The Site may settle (or part-settle) some
                    markets before the official result is declared (or may
                    increase a customer&apos;s &apos;available to bet&apos;
                    balance by the minimum potential winnings of that customer
                    on a given market) purely as a customer service benefit.
                    However, the Site reserves the right to amend the settlement
                    of the market if: (i) the official result is different to
                    the result on which the Site initially settled the market;
                    or (ii) if the whole market is eventually voided (e.g. for
                    an abandoned event).
                  </li>
                  <li>
                    • The Site reserves the right to reverse the settlement of a
                    market if a market is settled in error (for example, a human
                    or technical error).
                  </li>
                  <li>
                    • If The Site resettles a market, this may lead to
                    amendments being made to a customer&apos;s balance to
                    reflect changes in market settlement.
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h5 className="text-14 mb-2">
                  6. Non-runners, withdrawals and disqualifications
                </h5>
                <ul className="text-14">
                  <li>
                    • Subject always to the Site&apos;s right to void bets under
                    its terms and conditions or for any exception under the
                    Rules, if a market contains a statement that says &quot;All
                    bets stand, run or not&quot; (or something similar), then
                    all bets on a team or competitor will stand regardless of
                    whether or not the team or competitor starts the event or
                    takes any part in the event.
                  </li>
                  <li>
                    • If a team or competitor is disqualified, withdraws or
                    forfeits after starting an event they will be deemed a loser
                    providing at least one other team or competitor completes
                    the event. If no team or competitor completes an event
                    (having started) then all bets will be void except for bets
                    on any markets which have been unconditionally determined.
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h5 className="text-14 mb-2">
                  7. Winner with [named selection]&apos; markets
                </h5>
                <ul className="text-14">
                  <li>
                    • The Site may from time to time offer markets that are
                    dependent on the participation of a particular competitor.
                    If the competitor named in a &apos;Winner with …&apos;
                    market title does not participate in the tournament or event
                    then all bets on the market will be void.
                  </li>
                  <li>
                    • A team or competitor will be deemed to have participated
                    if they have taken part to the extent necessary to record an
                    official result or classification (including any
                    disqualification but excluding any &quot;did not start&quot;
                    or equivalent classification).
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h5 className="text-14 mb-2">
                  8. Abandonments, Cancellations, Postponements
                </h5>
                <ul className="text-14">
                  <li>
                    • Some markets have different rules and these are listed in
                    the Specific Sports Rules. However, where a market has no
                    rules in the Specific Sports Rules in relation to an
                    abandonment, cancellation and/or postponement the following
                    shall apply.
                  </li>
                  <li>
                    • In relation to any match, fixture, game, individual event,
                    or similar: If the event is not completed within three days
                    after the scheduled completion date, then all bets on
                    markets for this event will be void, except for bets on any
                    markets that have been unconditionally determined.
                  </li>
                  <li>
                    • In relation to any tournament, competition or similar: If
                    the event is not completed within three days after the
                    scheduled completion date, then any markets relating to the
                    event will be settled in accordance with the official ruling
                    of the relevant governing body, providing such a decision is
                    given within 90 days after the scheduled completion date. If
                    no official ruling is announced in this 90 day period, then
                    bets on any market relating to this event will be void,
                    except for bets on any markets which have been
                    unconditionally determined. If a market is to be voided but
                    has been part-settled as a courtesy to customers, then such
                    part-settled bets will be reversed and all bets on the
                    market will be void.
                  </li>
                  <li>
                    • The Site will decide (acting reasonably) whether a market
                    relates to a match (or similar) or a tournament (or
                    similar).
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h5 className="text-14 mb-2">9. Change of venue</h5>
                <ul className="text-14">
                  <li>
                    • Some markets have different rules and these are listed in
                    the Specific Sports Rules.
                  </li>
                  <li>
                    • However, if change of venue is not dealt with in the
                    Specific Sports Rules then the following shall apply:
                  </li>
                  <li>
                    • For any team sport: if the scheduled venue is changed
                    after the market is loaded by the Site, all bets will be
                    void only if the new venue is a home ground of the original
                    away team.
                  </li>
                  <li>
                    • For all categories or markets other than team sports: if
                    the scheduled venue is changed after the market has been
                    loaded by the Site, all bets will stand.
                  </li>
                  <li>
                    • If there is a change in the type of scheduled surface
                    after the market has been loaded, all bets will stand.
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h5 className="text-14 mb-2">10. Periods of time</h5>
                <ul className="text-14">
                  <li>
                    • Some markets have different rules and these are listed in
                    the Specific Sports Rules. However, if not dealt with in the
                    Specific Sports Rules then the following shall apply.
                  </li>
                  <li>
                    • If the scheduled duration of an event is changed after the
                    market has been loaded but before the start of the event,
                    then all bets will be void.
                  </li>
                  <li>
                    • Some markets refer to the length of time until an
                    occurrence in the event (e.g. time of first goal). If an
                    event happens in stoppage or injury time after any regular
                    time period then it will be deemed to have occurred at the
                    end of the regular time period. For example, if a goal is
                    scored in first half stoppage-time in a soccer match it will
                    be deemed to have occurred on 45 minutes.
                  </li>
                  <li>
                    • All bets apply to the relevant full &apos;regular
                    time&apos; period including stoppage time. Any extra-time
                    and/or penalty shoot-out is not included.
                  </li>
                  <li>
                    • References within these Rules to a particular number of
                    &apos;days&apos; shall mean the end of the day local time
                    after the expiry of the specified number of days.
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h5 className="text-14 mb-2">
                  11. &quot;To qualify&quot; markets
                </h5>
                <ul className="text-14">
                  <li>
                    • Some markets have different rules and these are listed in
                    the Specific Sports Rules. However, if not dealt with in the
                    Specific Sports Rules then the following shall apply.
                  </li>
                  <li>
                    • Any &apos;to qualify&apos; market (e.g. &quot;to reach the
                    final&quot; markets) will be determined by the competitor or
                    team that qualifies, whether or not they take part in the
                    next round or event for which they have qualified. Markets
                    will be settled after the qualifying stage and any
                    subsequent disqualification or amendment to the result will
                    not count.
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h5 className="text-14 mb-2">12. Dead heats</h5>
                <ul className="text-14">
                  <li>
                    • Unless stated otherwise in the Specific Sports Rules the
                    Dead Heat Rule applies to bets on a market where there are
                    more winners than expected.
                  </li>
                  <li>
                    • For each bet matched on a relevant winning selection, the
                    stake money is first reduced in proportion by multiplying it
                    by the sum of the number of winners expected, divided by the
                    number of actual winners (i.e. stake multiplied by (number
                    of winners expected/number of actual winners)). The winnings
                    are then paid to the successful backers on this
                    &apos;reduced stake&apos; (reduced stake multiplied by
                    traded price) and the remaining stake money is paid to the
                    appropriate layers.
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h5 className="text-14 mb-2">13. Miscellaneous</h5>
                <ul className="text-14">
                  <li>
                    • All references to time periods in the Rules relate to the
                    time zone in which the event takes place. For example, a
                    reference to the start time of a football match, relates to
                    the local kick-off time.
                  </li>
                  <li>
                    • All information supplied by the Site is done so in good
                    faith. However, the Site cannot accept liability for any
                    errors or omissions in respect of any information, such as
                    the posting of prices, runners, times, scores, results or
                    general statistics.
                  </li>
                  <li>
                    • The Site reserves the right to correct any obvious errors
                    and shall take all reasonable steps to ensure markets are
                    administered with integrity and transparency.
                  </li>
                  <li>
                    • If an incorrect team or competitor name is displayed
                    (excluding minor spelling mistakes) or the incorrect number
                    of teams, competitors or outcomes is displayed in any
                    complete market or a market is otherwise loaded using
                    incorrect information or includes any obvious error, then
                    the Site reserves the right to suspend the market and
                    (providing it acts reasonably) to void all bets matched on
                    the market.
                  </li>
                  <li>
                    • Customers are responsible for ensuring that they satisfy
                    themselves that the selection on which they place a bet is
                    their intended selection. For example, in the case of a
                    competitor bearing the same name as another individual not
                    competing in the relevant event, the onus is on the customer
                    to ensure that they know which competitor the Site has
                    loaded into the relevant market and to ensure that they are
                    placing their bet on their chosen competitor.
                  </li>
                  <li>
                    • The Site may, in its sole and absolute discretion, decide
                    to suspend betting on a market at any time (even if such
                    suspension is earlier than anticipated by the Rules). In the
                    interests of maintaining integrity and fairness in the
                    markets, the Site may also void certain bets in a market or
                    void a whole market in its entirety.
                  </li>
                  <li>
                    • In the event that members are unable to place bets due to
                    technical issues or for any other reason, the Site has no
                    obligation to accept bets in an alternate manner. Any bets
                    attempted to be placed in another manner will not be
                    accepted.
                  </li>
                  <li>
                    • The Site reserves the right to void any bets placed on
                    markets where an incorrect price or line was offered.
                  </li>
                  <li>
                    • The Site reserves the right to close or suspend a
                    customer’s account if it considers that that customer has
                    used the Site in an unfair manner, has deliberately cheated
                    or taken unfair advantage or if the customer’s account is
                    being used for the benefit of a third party. The Site also
                    reserves the right to close or suspend a customer’s account
                    if it considers that it has been used in a fraudulent manner
                    or for illegal and/or unlawful or improper purposes.
                  </li>
                  <li>
                    • The Site reserves the right to amend the Rules at any
                    time. Any such revision will be binding and effective
                    immediately on the posting of such rule changes on the Site
                    and any markets loaded after the new Rules have been posted
                    shall be governed by the new Rules.
                  </li>
                  <li>
                    • The Site reserves the right to cancel unmatched bets to
                    protect customers at any time.
                  </li>
                  <li>
                    • The Site shall use its reasonable endeavours to resolve
                    disputes and shall act with fairness and integrity in
                    exercising its rights under these rules. The Site’s decision
                    in such cases shall be final and binding upon the customer.
                  </li>
                  <li>
                    • On the settlement of any market, amounts relating to: (i)
                    winnings/losses on bets; and (ii) any charges will be
                    rounded up or down to the nearest two decimal places.
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h5 className="text-14 mb-2">14. Multiple accounts</h5>
                <ul className="text-14">
                  <li>
                    • Customers are not permitted to hold multiple accounts.
                    This includes holding an account with any other site
                    operating on the same platform as this Site.
                  </li>
                  <li>
                    • Customers who continue to operate multiple accounts will
                    have their accounts &quot;linked&quot; and managed
                    accordingly which may affect the extent to which bets can be
                    placed on the Site.
                  </li>
                  <li>
                    • If the Site believes, in its absolute discretion, that
                    customers have registered and/or used more than one account,
                    and/or acted in collusion with one or more other individuals
                    through a number of different accounts, the Site reserves
                    the right to void bets and/or withhold any winnings arising
                    from such a behaviour.
                  </li>
                </ul>
              </div>
              {/* 15. Use of Virtual Private Network (VPN) and Proxy Servers */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">
                  15. Use of Virtual Private Network (VPN) and Proxy Servers
                </h5>
                <ul className="text-14">
                  <li>
                    • Customers using VPN applications to mask location or proxy
                    servers to mask device are liable to having bets
                    invalidated.
                  </li>
                  <li>
                    • Customers appearing from multiple IP locations are also
                    liable to having bets invalidated.
                  </li>
                </ul>
              </div>

              {/* 16. Cheating/Sniping */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">16. Cheating/Sniping</h5>
                <ul className="text-14">
                  <li>
                    • Cheating of any kind is not allowed and customers bets who
                    are deemed to be cheating are liable to have bets made void.
                  </li>
                  <li>
                    • Cheating includes but is not limited to; market price
                    manipulation, court siding, sniping and commission abuse.
                  </li>
                </ul>
              </div>

              {/* 17. Integrity */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">17. Integrity</h5>
                <ul className="text-14">
                  <li>
                    • The Site reserves the right to void any bets that are
                    under review as part of any integrity investigation.
                  </li>
                  <li>
                    • The Site may void certain bets in a market or void a whole
                    market in its entirety as a result of any integrity
                    investigation.
                  </li>
                  <li>
                    • The Site’s decision in such integrity cases shall be final
                    and binding upon the customer.
                  </li>
                </ul>
              </div>

              {/* PART C - SPECIFIC SPORTS RULES */}
              <h4 className="text-14 mb-2">PART C - SPECIFIC SPORTS RULES</h4>

              {/* 1. Cricket - General */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">1. Cricket - General</h5>
                <ul className="text-14">
                  <li>
                    • If a ball is not bowled during a competition, series or
                    match then all bets will be void except for those on any
                    market that has been unconditionally determined (e.g. in the
                    &apos;Completed Match&apos; market).
                  </li>
                  <li>
                    • If a match is shortened by weather, all bets will be
                    settled according to the official result (including for
                    limited overs matches, the result determined by the
                    Duckworth Lewis method).
                  </li>
                  <li>
                    • In the event of a match being decided by a bowl-off or
                    toss of the coin, all bets will be void except for those on
                    markets that have been unconditionally determined.
                  </li>
                </ul>
              </div>

              {/* Test Matches */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">Test Matches</h5>
                <ul className="text-14">
                  <li>
                    • If a match starts but is later abandoned for any reason
                    other than weather (which may include but is not limited to:
                    dangerous or unplayable wicket or outfield; pitch vandalism;
                    strike or boycott; crowd protests/violence; stadium damage;
                    acts of terrorism; and acts of God), the Site reserves the
                    right to void all bets, except for those on markets that
                    have been unconditionally determined.
                  </li>
                  <li>
                    • If the match is not scheduled to be completed within five
                    days after the original scheduled completion date, then all
                    bets on markets for this event will be void, except for bets
                    on any markets that have been unconditionally determined.
                  </li>
                </ul>
              </div>

              {/* Limited Over Matches */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">Limited Over Matches</h5>
                <ul className="text-14">
                  <li>
                    • If a match is declared &quot;No Result&apos;&apos;, bets
                    will be void on all markets for the event except for those
                    markets which have been unconditionally determined or where
                    the minimum number of overs have been bowled as laid out in
                    the market specific information.
                  </li>
                  <li>
                    • In the event of a new toss taking place on a scheduled
                    reserve day for a limited overs match all bets that were
                    placed after 30 minutes before the original scheduled start
                    of play on the first day will be made void. This rule
                    relates to all markets except those that have been
                    unconditionally determined (e.g. in the win the toss and
                    toss combination markets).
                  </li>
                  <li>
                    • The Site will void all Super Over bets in the event of a
                    tied Super Over regardless of settlement rules elsewhere.
                  </li>
                </ul>
              </div>

              {/* Format Specific Session Runs Rules */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">
                  Format Specific Session Runs Rules
                </h5>
                <h6 className="text-14  mb-1">Test Matches</h6>
                <ul className="text-14 mb-3">
                  <li>
                    • Test Matches (Meter Paari) - All bets, open or closed, on
                    a team’s innings runs shall be void if 70 full overs are not
                    bowled unless one team has won, is dismissed or declares
                    prior to that point.
                  </li>
                  <li>
                    • ADV markets for both teams will be valid in test matches,
                    regardless of which team bats first.
                  </li>
                  <li>
                    • Where a session is open for a nominated number of overs
                    but the team declare before the end of that session, the
                    session is made complete by the remaining number of balls
                    from the opposing team’s innings that follows the
                    declaration.
                  </li>
                  <li>
                    • Day 1, session 1, a minimum of 25 overs must be bowled,
                    otherwise all bets in this session market will be void.
                  </li>
                  <li>
                    • Day 1, session 2, a minimum of 25 overs must be bowled,
                    otherwise all bets in this session market will be void.
                  </li>
                  <li>
                    • 1st Day Total Run markets will only be valid if a minimum
                    of 80 overs are bowled on this day. Otherwise all bets in
                    this market will be void.
                  </li>
                  <li>
                    • Test Matches - (PLAYERS METER) Individual Batsmen Runs /
                    Partnerships - All bets, open or closed, on an individual
                    batsman or partnership runs shall be void if 50 full overs
                    are not bowled unless one team has won, is dismissed or
                    declares prior to that point. Bets on partnership totals
                    make up when the next wicket falls...
                  </li>
                  <li>
                    • Total Match Four, Total Match Sixes, Total Match Runs,
                    Total Match Wides, Total Match Extras, Total Match Wicket,
                    Top Batsmen, Highest Over, Innings Designated Line Markets
                    will only be valid if the third innings is played.
                    Otherwise, all bets will be void.
                  </li>
                  <li>
                    • Next Batsman Out markets - if a player retires injured,
                    bets will be void in this market.
                  </li>
                </ul>

                <h6 className="text-14  mb-1">Limited Overs Matches</h6>
                <ul className="text-14 mb-3">
                  <li>
                    • Limited Overs Matches - (Player Meter), Individual Batsmen
                    Runs or Partnerships - In a limited overs match where bets
                    may be made ...
                  </li>
                  <li>
                    • Total Match Four, Total Match Sixes, Total Match Runs,
                    Total Match Wides, Total Match Extras, Total Match Wicket,
                    Top Batsmen, Highest Over, Innings Designated Line Markets
                    will only be valid if the second innings is played.
                    Otherwise, all bets will be void.
                  </li>
                </ul>

                <h6 className="text-14  mb-1">Exchange Runs</h6>
                <ul className="text-14 mb-3">
                  <li>
                    • Bets are placed in an exchange and matched with
                    corresponding bets.
                  </li>
                  <li>
                    • Bets will be matched at the requested run line or better.
                  </li>
                  <li>• All exchange runs are based on decimal odds format.</li>
                  <li>• All bets are placed at 2.00 odds.</li>
                  <li>• Bets will be void in the following cases ...</li>
                  <li>
                    • Please note that if the batting side reach their target
                    ...
                  </li>
                </ul>
              </div>

              {/* Soccer Rules */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">Soccer</h5>
                <ul className="text-14">
                  <li>• If the Site does not suspend a market on time ...</li>
                  <li>
                    • If a match has not started (or if the Site believes ...)
                  </li>
                  <li>• If a match starts but is later abandoned ...</li>
                  <li>• For Friendly matches, all bets apply ...</li>
                  <li>• Match odds bets apply to the full duration ...</li>
                  <li>
                    • If an official fixture lists different team details ...
                  </li>
                  <li>
                    • If a team is disqualified, thrown out or otherwise removed
                    ...
                  </li>
                  <li>
                    • The relevant season will be deemed to have started once
                    the first league game has been played ...
                  </li>
                  <li>
                    • For &apos;top goalscorer&apos; markets only the goals
                    scored ...
                  </li>
                  <li>
                    • In markets which relate to the number of incidents ...
                  </li>
                  <li>
                    • For markets that relate to the number of bookings ...
                  </li>
                </ul>
              </div>

              {/* Tennis Rules */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">Tennis</h5>
                <h6 className="text-14  mb-1">General / Exchange Markets</h6>
                <ul className="text-14 mb-3">
                  <li>
                    • If a player or pairing retires or is disqualified ...
                  </li>
                  <li>• All bets will stand regardless of changes ...</li>
                  <li>• If the scheduled duration of a match is reduced ...</li>
                  <li>• Where markets are offered on individual games ...</li>
                </ul>

                <h6 className="text-14  mb-1">Fancy Markets</h6>
                <ul className="text-14 mb-3">
                  <li>
                    • Head to Head Matchups: One full set must be completed ...
                  </li>
                  <li>
                    • First Set Betting: If the first set is not completed ...
                  </li>
                  <li>
                    • Sets Betting: If a tennis match is not completed ...
                  </li>
                  <li>• Handicap and Total Games Betting: ...</li>
                  <li>• Proposition Betting: ...</li>
                  <li>• Team Total Betting: ...</li>
                </ul>

                <h6 className="text-14  mb-1">Delay or Suspension</h6>
                <ul className="text-14 mb-3">
                  <li>
                    • If a tennis match is completed, without retirement ...
                  </li>
                </ul>

                <h6 className="text-14  mb-1">Pro Set</h6>
                <ul className="text-14 mb-3">
                  <li>• If a match is decided on a Pro Set ...</li>
                </ul>

                <h6 className="text-14  mb-1">
                  Change of Venue or Playing Surface
                </h6>
                <ul className="text-14 mb-3">
                  <li>• All bets stand regardless of any change ...</li>
                </ul>

                <h6 className="text-14  mb-1">Davis and Federation Cup</h6>
                <ul className="text-14 mb-3">
                  <li>• All bets stand regardless of any change ...</li>
                </ul>

                <h6 className="text-14  mb-1">Live Betting</h6>
                <ul className="text-14">
                  <li>
                    • The next point must be played for wagers to have action
                    ...
                  </li>
                  <li>• If the first set is not completed, all bets ...</li>
                  <li>
                    • Individual Sets Betting: If the stated set is not
                    completed ...
                  </li>
                  <li>• Handicap and Total Games Betting: ...</li>
                  <li>
                    • When betting on an individual game, only the score ...
                  </li>
                  <li>• If any subsequent games are not played, bets ...</li>
                </ul>
              </div>

              {/* Greyhound Racing */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">Greyhound Racing</h5>
                <ul className="text-14 mb-3">
                  <li>
                    • All bets (excluding those struck on ante-post and
                    Australian licensed markets) are placed on trap numbers.
                    Greyhound names are displayed for information purposes only.
                  </li>
                  <li>
                    • If the first set is not completed, all bets on the outcome
                    of the match (spread, money line, next set and total) will
                    be void. All bets on a specific game will stand, provided
                    that game was completed in its entirety.
                  </li>
                  <li>
                    • If a non-runner or reserve runner is declared, then all
                    bets prior to the update of the market on the Site will be
                    void and all unmatched bets including &apos;Take SP&apos;
                    and &apos;keep&apos; bets will be cancelled (except for
                    certain SP bets as set out in Paragraph 10.5 of Part B
                    above).
                  </li>
                  <li>
                    • If there are no finishers in any race or any race is
                    declared void before the official result is declared then
                    all bets will be void.
                  </li>
                  <li>
                    • If the scheduled venue is changed after the market has
                    been loaded by the Site, all bets will be void.
                  </li>
                </ul>

                <h6 className="text-14  mb-1">
                  Australian Specific Non-Runner Rules
                </h6>
                <ul className="text-14">
                  <li>
                    • Notwithstanding the above, the following rules apply to
                    declared non-runners in Australian greyhound markets.
                  </li>
                  <li>
                    • If a greyhound becomes a notified non runner after the
                    market is loaded but prior to the commencement of the race
                    it will be removed and all bets on the market, matched prior
                    to the update of the market on the Site, will be voided.
                  </li>
                  <li>
                    • If, following the completion of a race, the stewards
                    declare a greyhound a non-runner, the Site will resettle the
                    market and will void all bets that were placed on that
                    runner only. The Site will then apply a reduction factor to
                    all bets placed on the winner (or placegetters in the case
                    of place markets) based on that runner&apos;s weighted
                    average price.
                  </li>
                </ul>
              </div>

              {/* Horseracing */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">Horseracing</h5>

                <h6 className="text-14  mb-1">General</h6>
                <ul className="text-14 mb-3">
                  <li>
                    • All individual race markets will be determined according
                    to the official result at the time of the
                    &apos;weigh-in&apos; announcement (or equivalent).
                    Subsequent disqualifications, appeals or amendments to the
                    result will be disregarded.
                  </li>
                  <li>
                    • If a race is abandoned or otherwise declared void, or in
                    the event of a walkover, all bets on that race will be void.
                  </li>
                  <li>
                    • If the scheduled venue is changed after the market has
                    been loaded by the Site, all bets will be void.
                  </li>
                  <li>
                    • Where a race does not take part on its scheduled day, all
                    bets will be void.
                  </li>
                  <li>
                    • If a scheduled surface type is changed (e.g. turf to dirt)
                    all bets will stand.
                  </li>
                  <li>
                    • Horseracing Exchange Multiples are based on the
                    Site&apos;s &apos;day of the race&apos; markets (and not the
                    Site&apos;s ante-post markets). The Site&apos;s horseracing
                    ante-post rules do not therefore apply in relation to
                    horseracing Exchange Multiples.
                  </li>
                </ul>

                <h6 className="text-14  mb-1">The Site Non-Runner Rule</h6>
                <ul className="text-14 mb-3">
                  <li>
                    • The Site&apos;s non-runner rule relates to the adjustment
                    of odds on bets already matched when a horse in a race is
                    declared a non-runner...
                  </li>
                  <li>
                    • Any horse listed when the relevant market is loaded which
                    does not subsequently come under starter&apos;s orders is
                    deemed to be a non-runner.
                  </li>
                  <li>
                    • When the market is loaded each horse is given a
                    &apos;reduction factor&apos;, based on a forecast price,
                    which is expressed as a percentage...
                  </li>
                  <li>
                    • Reductions will be made to both win and place markets but
                    applied differently (as described below)...
                  </li>
                  <li>
                    • As soon as the Site becomes aware that a horse is an
                    official non-runner or a highly likely non-runner...
                  </li>
                  <li>
                    • All matched bets on that horse will be void and the horse
                    will be removed from the market.
                  </li>
                  <li>
                    • In the win market: if the reduction factor of the
                    non-runner is 2.5% or greater...
                  </li>
                  <li>
                    • In the place market the reduction factor of all
                    non-runners will be applied...
                  </li>
                  <li>
                    • Reduction factors are not applied to bets which are struck
                    in-play...
                  </li>
                  <li>
                    • In the event of a non-runner being removed from a race in
                    error...
                  </li>
                  <li>
                    • Any non-runners will be removed from the relevant markets
                    in the order in which they are brought...
                  </li>
                  <li>
                    • If a runner is not included in a market because of an
                    error or incorrect information...
                  </li>
                </ul>

                <h6 className="text-14  mb-1">
                  How the Reductions are applied for Exchange markets
                </h6>
                <ul className="text-14 mb-3">
                  <li>
                    • In the win market, reductions will be made on the traded
                    price...
                  </li>
                  <li>
                    • In the place market, reductions will be made to the
                    potential winnings on the bet only...
                  </li>
                  <li>
                    • The traded price may be further reduced if any other
                    horse(s) is subsequently declared a non-runner...
                  </li>
                  <li>
                    • Reserves: A reserve runner may appear in the relevant
                    markets...
                  </li>
                  <li>
                    • For the avoidance of doubt, any reduction factor
                    applicable to a non-runner replaced by a reserve...
                  </li>
                </ul>

                <h6 className="text-14  mb-1">Additional Rules</h6>
                <ul className="text-14">
                  <li>
                    • Card numbers are posted as a guide only: bets are placed
                    on a named horse.
                  </li>
                  <li>• Horses will not be coupled.</li>
                  <li>
                    • Where any horse(s) runs for purse money only it is deemed
                    a non-runner for betting purposes...
                  </li>
                </ul>
              </div>

              {/* Kabaddi Rules */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">Kabaddi Rules</h5>
                <ul className="text-14">
                  <li>
                    • For Playoffs Final Result Of 40 Minutes Of Two Halves Will
                    Be Valid In Our Exchange.
                  </li>
                  <li>
                    • Result of individual player of fancy will be validated
                    only when player play that match.
                  </li>
                  <li>
                    • In any case wrong rate has been given in fancy that
                    particular bets will be deleted.
                  </li>
                  <li>
                    • If any player will get injured during the match, then all
                    the bets will be valid of that individual player.
                  </li>
                  <li>
                    • All fancy bets will be validated when match has been tied.
                  </li>
                  <li>
                    • In any circumstances management decision will be final
                    related to all Fancy of kabaddi of our exchange.
                  </li>
                </ul>
              </div>

              {/* Cheating Rules */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">Cheating Rules</h5>
                <ul className="text-14">
                  <li>
                    • In Betfair & Other markets, If anyone is suspected using
                    ground commentary or courtsiding, company will void all
                    winning bets.
                  </li>
                  <li>
                    • Company reserves the right to suspend/void any id/bets if
                    the same is found to be illegitimate (VPN, robot-use,
                    multiple entry from same IP, multiple bets at same time,
                    etc.).
                  </li>
                  <li>
                    • This is a zero-tolerance policy, and no arguments will be
                    entertained. The bets will be voided after the match is
                    completed. Company&apos;s decision will be final.
                  </li>
                </ul>
              </div>

              {/* Score Card & Streaming Rules */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">Score Card and Streaming Rules</h5>
                <ul className="text-14">
                  <li>
                    • Live scores and other data on this site is sourced from
                    third party feeds and may be subject to delays or
                    inaccuracies.
                  </li>
                  <li>
                    • If you rely on this data to place bets, you do so at your
                    own risk. Our exchange does not accept responsibility for
                    loss.
                  </li>
                  <li>
                    • Provides this data AS IS with no warranty of accuracy,
                    completeness or timeliness.
                  </li>
                </ul>
              </div>

              {/* Site Glitch Rules */}
              <div className="mb-5">
                <h5 className="text-14 mb-2">Site Glitch Rules</h5>
                <ul className="text-14 mb-3">
                  <li>
                    • Should a Technical Glitch in Software occur, we will not
                    be held responsible for any losses.
                  </li>
                  <li>
                    • Total Match 30s: Total number of players who have scored
                    between 30-49.
                  </li>
                  <li>
                    • Total Match 50s: Total number of players who have scored
                    between 50-99.
                  </li>
                  <li>
                    • Total Match 100s: Total number of players who have scored
                    between 100-199.
                  </li>
                </ul>

                <p className="text-14">
                  *1st over Adv Fancy will be settled for both 1st and 2nd
                  innings team. Bets will not be voided*
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
RulesModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
